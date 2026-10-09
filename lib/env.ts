import { randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
const directory = path.join(process.cwd(), 'data');
mkdirSync(directory, { recursive: true });
function secret(): string {
    if (process.env.SESSION_SECRET)
        return process.env.SESSION_SECRET;
    const file = path.join(directory, '.secret');
    try {
        writeFileSync(file, randomBytes(48).toString('hex'), { flag: 'wx', mode: 0o600 });
    }
    catch (e) {
        if (!existsSync(file))
            throw e;
    }
    return readFileSync(file, 'utf8');
}
const rawTax = Number(process.env.TAX_RATE || 0);
if (!Number.isFinite(rawTax) || rawTax < 0 || rawTax > 1)
    throw new Error('TAX_RATE must be a decimal fraction between 0 and 1');
export const env = { apiKey: process.env.ANTHROPIC_API_KEY || '', model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5', sessionSecret: secret(), reverseKey: process.env.OPTIONAL_REVERSE_IMAGE_API_KEY || '', taxRate: rawTax };
console.info(`[YUGANTAR] AI: ${env.apiKey ? 'configured (fallback on service failure)' : 'fallback'}; sessions: ${process.env.SESSION_SECRET ? 'configured' : 'local generated secret'}; reverse search: not implemented.`);
