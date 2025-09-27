import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { Request, Session, ChavrutaUser } from '../types';
import { mockMatches, mockRequests, mockSessions, you } from '../mockData';

let supabase: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  supabase = require('../../../others/config/lib/supabase').supabase;
} catch {}

export interface ChavrutaData {
  you: typeof you;
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  matches: ChavrutaUser[];
  setMatches: React.Dispatch<React.SetStateAction<ChavrutaUser[]>>;
  requests: Request[];
  setRequests: React.Dispatch<React.SetStateAction<Request[]>>;
  refreshing: boolean;
  onRefresh: () => Promise<void>;
  nextLive?: Session;
}

export function useChavrutaData(): ChavrutaData {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [matches, setMatches] = useState<ChavrutaUser[]>(mockMatches);
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel('chavruta-requests')
      .on('broadcast', { event: 'new-request' }, (payload: any) => {
        setRequests((prev) => [payload.request as Request, ...prev]);
      })
      .subscribe();

    return () => {
      try {
        channel.unsubscribe();
      } catch {}
    };
  }, []);

  const nextLive = useMemo(
    () =>
      sessions.find(
        (s) =>
          s.status === 'live' ||
          (dayjs(s.startsAt).isBefore(dayjs().add(10, 'minute')) &&
            dayjs(s.endsAt).isAfter(dayjs()))
      ),
    [sessions]
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // TODO: Replace with real network calls
      await new Promise((r) => setTimeout(r, 600));
    } finally {
      setRefreshing(false);
    }
  };

  return {
    you,
    sessions,
    setSessions,
    matches,
    setMatches,
    requests,
    setRequests,
    refreshing,
    onRefresh,
    nextLive,
  };
}
