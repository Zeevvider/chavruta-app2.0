import { useEffect, useMemo, useRef, useState } from "react";

type Opts = {
  cps?: number;          // chars per second
  delayMs?: number;      // initial delay before typing starts
  onDone?: () => void;
};

export function useTypewriter(fullText: string, opts: Opts = {}) {
  const { cps = 28, delayMs = 200, onDone } = opts;
  const [output, setOutput] = useState("");
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(cps);
  const [done, setDone] = useState(false);
  const iRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const text = useMemo(() => fullText ?? "", [fullText]);

  const clear = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const start = () => {
    clear();
    if (!text || done) return;
    const interval = Math.max(6, Math.floor(1000 / speed));
    timerRef.current = setInterval(() => {
      if (paused) return;
      const i = iRef.current;
      if (i >= text.length) {
        clear();
        if (!done) {
          setDone(true);
          onDone?.();
        }
        return;
      }
      // append a chunk (helps perf on long texts)
      const step = Math.max(1, Math.floor(speed / 12));
      const next = text.slice(0, Math.min(text.length, i + step));
      iRef.current = next.length;
      setOutput(next);
    }, interval);
  };

  const reset = () => {
    clear();
    iRef.current = 0;
    setOutput("");
    setDone(false);
  };

  const skip = () => {
    clear();
    iRef.current = text.length;
    setOutput(text);
    setDone(true);
    onDone?.();
  };

  useEffect(() => {
    reset();
    const t = setTimeout(start, delayMs);
    return () => { clear(); clearTimeout(t); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  useEffect(() => {
    if (!done) {
      clear();
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, paused]);

  return {
    text: output,
    done,
    paused,
    setPaused,
    setSpeed, // setSpeed(60) to fast-forward
    skip,
    restart: () => { reset(); start(); },
  };
}
