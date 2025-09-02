import dayjs from 'dayjs';
import { ChavrutaUser, Session, Request } from './types';


export const you: ChavrutaUser = {
id: 'you',
name: 'Zeev',
timezone: 'Asia/Jerusalem',
level: 'advanced',
tags: ['Choshen Mishpat', 'Hebrew', 'Spanish'],
};


const now = dayjs();


export const mockMatches: ChavrutaUser[] = [
{ id: 'u1', name: 'Eli', level: 'advanced', tags: ['Choshen Mishpat', 'Yevamot'] },
{ id: 'u2', name: 'Sara', level: 'intermediate', tags: ['Avot', 'Hebrew'] },
{ id: 'u3', name: 'Moshe', level: 'advanced', tags: ['Choshen Mishpat', 'Contracts'] },
];


export const mockSessions: Session[] = [
{
id: 's1',
chavrutaA: you,
chavrutaB: mockMatches[0],
topic: 'Choshen Mishpat 180 – שותפין וקניין חזקה',
startsAt: now.add(2, 'hour').toISOString(),
endsAt: now.add(3, 'hour').toISOString(),
status: 'scheduled',
roomId: 'room-abc',
},
{
id: 's2',
chavrutaA: you,
chavrutaB: mockMatches[2],
topic: 'חזרה אתמול – סוגיות קניין',
startsAt: now.subtract(1, 'day').add(1, 'hour').toISOString(),
endsAt: now.subtract(1, 'day').add(2, 'hour').toISOString(),
status: 'complete',
roomId: 'room-def',
},
];


export const mockRequests: Request[] = [
{
id: 'r1',
from: mockMatches[1],
topic: 'Mishnah Avot 1',
message: 'Want to learn 20 mins daily, mornings?',
createdAt: now.subtract(2, 'hour').toISOString(),
},
];