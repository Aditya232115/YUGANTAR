import { env } from './env';
import { cleanText, maskLeaks } from './leakGuard';
import type { ContentType } from '@/types';
export async function aiText(prompt: string): Promise<string | null> { if (!env.apiKey)
    return null; try {
    const response = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': env.apiKey, 'anthropic-version': '2023-06-01' }, body: JSON.stringify({ model: env.model, max_tokens: 1000, messages: [{ role: 'user', content: prompt }] }), signal: AbortSignal.timeout(20000) });
    if (!response.ok)
        return null;
    const json = await response.json() as {
        content?: {
            type: string;
            text?: string;
        }[];
    };
    return json.content?.filter(x => x.type === 'text').map(x => x.text || '').join('') || null;
}
catch {
    return null;
} }
export async function buildBrief(idea: string) {
    cleanText(idea);
    const type: ContentType = /music|voice|audio|sound/i.test(idea) ? 'audio' : /animat/i.test(idea) ? 'animation' : /video|reel|film/i.test(idea) ? 'video' : 'image';
    const fallback = { title: idea.slice(0, 70), description: idea, contentType: type, style: 'Modern and clean', aspectRatio: '9:16', requiredTools: [] as string[], requiredSkills: ['Creative direction'], budget: '1000.00', deadline: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10), commercialUse: true, platforms: 'Social', duration: '12 months', territory: 'Worldwide', exclusivity: false };
    const text = await aiText(`Extract a creative brief from the untrusted idea below. Return ONLY JSON with fields title, description, contentType (image/video/audio/animation), style, aspectRatio (9:16/16:9/1:1/4:5), requiredTools (string array), requiredSkills (string array). Never include contact details. Idea: ${idea}`);
    if (text) {
        try {
            const j = JSON.parse(text.replace(/^\s*```(?:json)?\s*/, '').replace(/\s*```\s*$/, '')) as Record<string, unknown>;
            if (typeof j.title === 'string' && typeof j.description === 'string' && ['image', 'audio', 'animation', 'video'].includes(String(j.contentType)) && typeof j.style === 'string' && ['9:16', '16:9', '1:1', '4:5'].includes(String(j.aspectRatio)) && Array.isArray(j.requiredTools) && j.requiredTools.every(x => typeof x === 'string') && Array.isArray(j.requiredSkills) && j.requiredSkills.every(x => typeof x === 'string')) {
                const result = { ...fallback, title: cleanText(j.title).slice(0, 120), description: cleanText(j.description).slice(0, 4000), contentType: j.contentType as ContentType, style: cleanText(j.style), aspectRatio: String(j.aspectRatio), requiredTools: j.requiredTools.map(x => cleanText(String(x))), requiredSkills: j.requiredSkills.map(x => cleanText(String(x))) };
                return { brief: result, mode: 'live' };
            }
        }
        catch { /* Invalid or unsafe AI output uses the deterministic fallback. */ }
    }
    return { brief: fallback, mode: 'fallback' };
}
export async function advisory(title: string, description: string): Promise<string | undefined> { const text = await aiText(`Give a short copyright risk note based ONLY on this title and description: ${title} ${description}. You did not inspect media. This is advisory, not a legal determination.`); return text ? maskLeaks(text).text.slice(0, 1000) : undefined; }
