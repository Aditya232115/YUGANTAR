import type { Brief, PublicCreator, Match } from '@/types';
export function rankCreators(brief: Brief, creators: PublicCreator[]): Match[] {
    return creators.map(creator => {
        const covers = (wanted: string[], actual: string[]) => wanted.filter(w => actual.some(a => a.toLowerCase() === w.toLowerCase())).length;
        const tools = covers(brief.requiredTools, creator.tools), skills = covers(brief.requiredSkills, creator.skills), content = creator.contentTypes.includes(brief.contentType), budget = creator.rate <= brief.budget, days = Math.max(0, Math.ceil((Date.parse(brief.deadline) - Date.now()) / 86400000)), turnaround = creator.turnaroundDays <= days, commercial = !brief.commercialUse || creator.portfolio.every(p => p.workflow.license === 'commercial-safe');
        const score = Math.round(25 * (brief.requiredTools.length ? tools / brief.requiredTools.length : 1) + 25 * (brief.requiredSkills.length ? skills / brief.requiredSkills.length : 1) + 20 * Number(content) + 10 * Number(budget) + 10 * Number(turnaround) + 10 * Number(commercial));
        return { creator, score, reasons: [`Tools covered ${tools} of ${brief.requiredTools.length}`, `Skills covered ${skills} of ${brief.requiredSkills.length}`, content ? 'Content type covered' : 'Different content type', budget ? 'Within your budget' : 'Rate exceeds budget', turnaround ? 'Turnaround fits deadline' : 'Deadline may be too short', commercial ? 'Commercial-use compatible' : 'Non-commercial work in portfolio'], conflicts: [...(!commercial ? ['Non-commercial model or license in portfolio'] : []), ...(!turnaround ? ['Turnaround conflict'] : [])] };
    }).sort((a, b) => b.score - a.score);
}
