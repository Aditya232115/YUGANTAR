import { redirect } from 'next/navigation';
import { getSession } from './auth';
import type { Role } from '@/types';
export async function pageUser(role?: Role) { const u = await getSession(); if (!u)
    redirect('/login'); if (role && u.role !== role)
    redirect(`/${u.role}/dashboard`); return u; }
