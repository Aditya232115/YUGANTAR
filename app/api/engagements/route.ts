import { NextRequest } from 'next/server';
import { api } from '@/lib/http';
import { handle } from '@/lib/service';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// Only sanitized public projections and role-owned fields are returned.
function route(req: NextRequest) { return api(req, () => handle(req, ['engagements'])); }
export const GET = route;
export const POST = route;
