import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { env } from './env';
import { advisory } from './ai';
import type { PortfolioItem, PlagiarismCheck } from '@/types';
export function hamming(a: string, b: string): number { let n = BigInt(`0x${a}`) ^ BigInt(`0x${b}`), distance = 0; while (n) {
    distance += Number(n & 1n);
    n >>= 1n;
} return distance; }
function shingles(s: string): Set<string> { const words = s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').split(/\s+/).filter(Boolean); return new Set(words.length < 3 ? words : words.slice(0, -2).map((_, i) => words.slice(i, i + 3).join(' '))); }
export function similarity(a: string, b: string): number { const x = shingles(a), y = shingles(b), union = new Set([...x, ...y]); return union.size ? [...x].filter(s => y.has(s)).length / union.size : 0; }
export async function reverseImageSearch(): Promise<string> { return env.reverseKey ? 'Key supplied; provider integration not implemented' : 'not configured'; }
export async function checkPlagiarism(file: Buffer | undefined, isImage: boolean, title: string, description: string, items: PortfolioItem[]): Promise<PlagiarismCheck> {
    const checks: string[] = [];
    let blocked = false, review = false, sha256: string | undefined, dhash: string | undefined;
    if (file) {
        sha256 = createHash('sha256').update(file).digest('hex');
        blocked = items.some(i => i.plagiarism.sha256 === sha256);
        checks.push(blocked ? 'Exact SHA-256 duplicate found within YUGANTAR' : 'Exact SHA-256: no duplicate within YUGANTAR');
    }
    else
        checks.push('Exact duplicate: skipped for media URL (remote file not fetched)');
    if (file && isImage) {
        try {
            const { data } = await sharp(file, { limitInputPixels: 25000000 }).rotate().resize(9, 8, { fit: 'fill' }).grayscale().raw().toBuffer({ resolveWithObject: true });
            let hash = 0n;
            for (let y = 0; y < 8; y++)
                for (let x = 0; x < 8; x++)
                    hash = (hash << 1n) | BigInt(data[y * 9 + x] > data[y * 9 + x + 1] ? 1 : 0);
            dhash = hash.toString(16).padStart(16, '0');
            review = items.some(i => i.plagiarism.dhash && hamming(dhash!, i.plagiarism.dhash) <= 10);
            checks.push(review ? 'Near-duplicate dHash within distance 10 found' : '64-bit dHash: no near-duplicate within distance 10');
        }
        catch {
            review = true;
            checks.push('Image could not be decoded; manual review needed');
        }
    }
    else
        checks.push('Near-duplicate images: skipped (no uploaded image)');
    const similar = items.some(i => similarity(`${title} ${description}`, `${i.title} ${i.description}`) > .8);
    review ||= similar;
    checks.push(similar ? 'Text shingles: similarity above 0.8' : 'Text shingles: no similarity above 0.8');
    const note = await advisory(title, description);
    if (note)
        checks.push('AI review (advisory): title and metadata only');
    checks.push('Scope: platform duplicates and basic risk, not the whole internet');
    return { status: blocked ? 'Blocked (duplicate)' : review ? 'Needs review' : 'Original', checks, advisory: note, sha256, dhash };
}
