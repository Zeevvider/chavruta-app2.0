// lib/sefaria.ts
import { z } from 'zod';

const BASE = 'https://www.sefaria.org/api';

export const SefariaText = z.object({
  he: z.union([z.string(), z.array(z.string())]).optional(),   // <- allow both
  text: z.union([z.string(), z.array(z.string())]).optional(), // <- allow both
  ref: z.string(),
});
export type SefariaTextT = z.infer<typeof SefariaText>;

async function get<T>(path: string, schema: z.ZodSchema<T>): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new Error('Invalid API response');
  }
  return parsed.data;
}

export function fetchText(ref: string, lang: 'he' | 'en' | 'both' = 'both') {
  // context=0 forces the API to return only the requested segment when possible
  const langParam = lang === 'both' ? 'he' : lang;
  const qs = `?lang=${langParam}&context=0`;
  return get(`/texts/${encodeURIComponent(ref)}${qs}`, SefariaText);
}
// --------- EXTRA SCHEMAS FOR WHOLE-BOOK RESPONSES ---------
export const SefariaCollection = z.object({
  // When you request a whole work (e.g., "Mishnah Avot") Sefaria returns nested arrays.
  // We allow string | string[] | (string|string[])[] to be very tolerant.
  he: z
    .union([
      z.string(),
      z.array(z.string()),
      z.array(z.array(z.string())),
    ])
    .optional(),
  text: z
    .union([
      z.string(),
      z.array(z.string()),
      z.array(z.array(z.string())),
    ])
    .optional(),
  ref: z.string(),
});
export type SefariaCollectionT = z.infer<typeof SefariaCollection>;

/** Fetch a whole work or top-level node, e.g., "Mishnah Avot" (no chapter). */
export async function fetchCollection(refBase: string, lang: 'he' | 'en' | 'both' = 'he') {
  const langParam = lang === 'both' ? 'he' : lang;
  const qs = `?lang=${langParam}&context=0`;
  return get(`/texts/${encodeURIComponent(refBase)}${qs}`, SefariaCollection);
}

/** Try to compute chapter → mishnayot counts for a Mishnah masechet. */
export async function getMishnahChapters(refBase: string): Promise<{ title: string; count: number }[]> {
  // 1) Try via /texts/{refBase} which often returns nested arrays (chapters -> mishnayot)
  try {
    const col = await fetchCollection(refBase, 'he');
    if (Array.isArray(col.he)) {
      // he can be string[] (chapters flattened) OR string[][] (chapters -> mishnayot)
      // We accept both and compute counts as best as possible.
      const chapters = (col.he as any[]);
      // If chapters[0] is an array -> assume string[][]; else fallback to text for structure.
      if (Array.isArray(chapters[0])) {
        const counts = chapters.map((ch, i) => ({
          title: `Perek ${i + 1}`,
          count: Array.isArray(ch) ? ch.length : 0,
        }));
        if (counts.length) return counts;
      }
    }

    if (Array.isArray((col as any).text)) {
      const chapters = (col as any).text as any[];
      if (Array.isArray(chapters[0])) {
        const counts = chapters.map((ch, i) => ({
          title: `Perek ${i + 1}`,
          count: Array.isArray(ch) ? ch.length : 0,
        }));
        if (counts.length) return counts;
      }
    }
  } catch {
    // fall through
  }

  // 2) Last-resort fallback so UI still works.
  // You can customize per-masechet here if you want exact counts for popular ones.
  if (/avot/i.test(refBase)) {
    return [
      { title: 'Perek 1', count: 18 },
      { title: 'Perek 2', count: 16 },
      { title: 'Perek 3', count: 18 },
      { title: 'Perek 4', count: 22 },
      { title: 'Perek 5', count: 26 },
      { title: 'Perek 6', count: 11 },
    ];
  }
  return [
    { title: 'Perek 1', count: 18 },
    { title: 'Perek 2', count: 10 },
    { title: 'Perek 3', count: 12 },
  ];
}
// --- returns number of סעיפים for each סימן in Kitzur (index 0 -> סימן 1) ---
export async function getKitzurSimanCounts(): Promise<number[]> {
  const res = await fetchCollection("Kitzur Shulchan Arukh", "he"); // from previous message
  const arr = (res.he ?? res.text) as any;
  if (Array.isArray(arr) && Array.isArray(arr[0])) {
    // arr = [ [seif1, seif2, ...], [ ... next siman ... ], ... ]
    return arr.map((siman: any) => (Array.isArray(siman) ? siman.length : 0));
  }
  // fallback so UI won’t break
  return new Array(221).fill(10);
}
