import type { PublicCreator } from '@/types';
export function filterCreators(creators: PublicCreator[], p: URLSearchParams): PublicCreator[] {
    return creators.filter(c => {
        const q = (p.get('q') || '').toLowerCase();
        return (!q || [c.alias, c.headline, c.bio, ...c.skills, ...c.tools, ...c.specialization].join(' ').toLowerCase().includes(q)) && ['skills', 'tools', 'specialization', 'contentTypes'].every(k => !p.get(k) || (c[k as 'skills' | 'tools' | 'specialization' | 'contentTypes'] as string[]).some(v => v.toLowerCase().includes(p.get(k)!.toLowerCase()))) && (!p.get('verified') || c.badges[p.get('verified') as keyof typeof c.badges]) && (!p.get('min') || c.rate >= Number(p.get('min')) * 100) && (!p.get('max') || c.rate <= Number(p.get('max')) * 100);
    });
}
