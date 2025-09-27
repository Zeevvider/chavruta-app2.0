# 🧠 Chavruta Code Learning App – Full Project Context

## 🗂️ Project Summary

**App Name:** Chavruta / Stender  
**Goal:** Create a React Native app to make Torah learning simple, gamified, and social.

### 🎯 Core Features:
- 📖 Chavruta Matching – Match users to learn together live or asynchronously.
- 🧠 Structured Text Navigation – Learn Torah in bite-sized, tap-able segments.
- 🎮 Gamification – Streaks, coins, achievements, levels, and mascot reactions.
- 📝 Insights & Reflections – Users can attach insights to words or verses.
- 🤖 AI Integration – Generate questions, summaries, and ask halachic questions.
- 🗓️ Calendar Sync – Schedule chavruta sessions and track upcoming shiurim.
- 🔁 Daily Learning Feed – Personalized suggestions for daily learning goals.
- 🌍 Language Support – Hebrew, English, Russian, French, Arabic, etc.
- 🔔 Smart Notifications / Widgets – Encourage streaks and micro-learning.

---

## 🏗️ App Architecture

### 📂 Main Folder Structure
| Folder | Purpose |
|--------|---------|
| `app/` | Core screens and routing (`index.tsx`, `_layout.tsx`) |
| `app/(auth)/` | Signup, Login, Onboarding screens |
| `app/chavruta/` | Matching, scheduling, and current chavruta logic |
| `app/library/` | Accessing Masechtot, Mishnayot, and BookReader |
| `app/calendar/` | Learning sessions, upcoming events |
| `app/profile/` | Profile, goals, languages, photos |
| `others/config/` | Tokens, mascots, colors, API keys |
| `supabase.ts` | Supabase client & authentication |
| `app/(tabs)/` | Bottom tabs navigation (`Home`, `Library`, etc.) |
| `components/` | Reusable components (CTA, InputRow, LanguagePicker) |

---

## 📐 Routing & Layout

- Expo Router based dynamic routing.
- `_layout.tsx`: Shared layout, theme wrapper, bottom tabs.
- `index.tsx`: Root route with conditional logic (onboarding done or not).

---

## 🧠 AI Features & Use Cases

| Feature | Description |
|---------|-------------|
| 🔤 Word Tap | Tap a word to get definition, root, or AI-generated tooltip. |
| 📌 Insight Add | Add reflections per pasuk/verse, shown as cards. |
| 🔍 Lens Toggle | Apply “logical”, “ethical”, or “mystical” lens to text. |
| 🤖 Ask a Rabbi | AI fetches source + generates halachic reply draft. |
| 🎯 Smart Quiz | AI generates custom quiz at end of Mishna. |
| 🔥 Mascot Reaction | Streak = celebration, missed goal = sad animation. |

---

## 🖌️ UI/UX Design System

- Duolingo-inspired.
- Custom mascots (Stender) with Lottie animations (idle, celebrating, sad).
- Color palette:
  - Background: `#F7EBDD`
  - Accent Green: `#ADC2A5`
  - Text: `#1E1E1E`, Muted: `#6B7280`
- Rounded cards, soft shadows, grid layouts, Tailwind-style class structure.

---

## 🧾 Dev Status (as of 2025-09-26)

| Feature | Status | Notes |
|---------|--------|-------|
| Signup/Login | ✅ Complete | Full form with image upload, language selection |
| Home Screen | ✅ Done | Hero, CTA, QuickActions, DailyCard |
| Profile Setup | ✅ Done | With avatar, name, languages |
| Library | 🛠 In Progress | Search → Chapters → Mishnayot → Text Reader |
| Chavruta | 🛠 In Progress | Scheduling, syncing, streak tracking |
| Calendar | 🛠 In Progress | Shows sessions, auto-populated events |
| AI Quiz / Summary | ⏳ Planned | Hooked to each Mishna end |
| Notifications | ⏳ Planned | Engagement-driven reminders |
| Widgets | ⏳ Planned | Android/iOS push-to-home learning |

---

## 🧪 AI Usage & Token Strategy

- Using GPT-4o via API
- Estimated cost: $0.01–$0.05 per file review
- Token limit: 128K → context split by screen/folder
- Summary prompt used with tools:
  ```
  Review this app context and files. Identify issues, inefficiencies, naming problems, and give improvement suggestions with examples.
  ```

---

## 📥 Notes for AI Tools (Cursor / Continue / CodeGPT)

1. Add `PROJECT_CONTEXT.md` to your file selection.
2. Add these files as context:
   - `app/index.tsx`, `app/_layout.tsx`
   - `app/(auth)/signup.tsx`, `login.tsx`, `onboarding.tsx`
   - `app/chavruta/*`, `library/*`, `calendar/*`, `profile/*`
   - `supabase.ts`, `utils/*`, `components/*`
3. Use this prompt:
   ```
   With full context above, please:
   - Review for logic bugs, anti-patterns
   - Suggest better file/component structure
   - Suggest performance or UI improvements
   - Warn about naming, state flow, or folder confusion
   ```

---

## 🧠 Notes from ChatGPT Conversations

You’ve discussed:
- Using Sefaria API to load structured Torah data
- Breaking Mishnayot into short segments for focused learning
- Creating tappable word-by-word components
- Connecting "Ask the Rav" to source-attached AI flow
- Building Duolingo-like flow: streaks, flames, coins, XP
- Supporting multiple languages and accessibility modes
- Exporting gamified quiz buttons at the end of each Mishna
- Building mascot layers in Lottie for idle/celebrating/sad
- Color palette + tailwind styles setup in `tokens.ts`

---

## 📌 Last Updated: 2025-09-26 15:09
