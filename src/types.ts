export type ChavrutaUser = {
id: string;
name: string;
avatar?: string;
timezone?: string;
level?: 'beginner' | 'intermediate' | 'advanced';
tags?: string[];
};


export type Session = {
id: string;
chavrutaA: ChavrutaUser;
chavrutaB: ChavrutaUser;
topic: string;
startsAt: string; // ISO
endsAt: string; // ISO
roomId?: string;
status: 'scheduled' | 'live' | 'complete' | 'cancelled';
};


export type Request = {
id: string;
from: ChavrutaUser;
topic: string;
message?: string;
createdAt: string; // ISO
};