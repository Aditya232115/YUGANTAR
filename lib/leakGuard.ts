const patterns = [/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, /(?:https?:\/\/|www\.)[^\s]+/gi, /\b(?:[a-z0-9-]+\.)+(?:com|net|org|io|co|in|ai|me)\b[^\s]*/gi, /@[a-z0-9_.]+/gi, /(?<!\w)\+?\d[\d\s().-]{7,}\d(?!\w)/g, /\b(?:whatsapp\s+me|dm\s+me(?:\s+on\s+(?:insta(?:gram)?|twitter|telegram))?|call\s+me|contact\s+me\s+on)\b/gi];
export function maskLeaks(value: string): {
    text: string;
    blocked: boolean;
} { let text = value; for (const pattern of patterns)
    text = text.replace(pattern, '[hidden by YUGANTAR]'); return { text, blocked: text !== value }; }
export function cleanText(value: string): string { if (maskLeaks(value).blocked)
    throw new Error('Please remove contact details; YUGANTAR keeps identities private'); return value.trim(); }
