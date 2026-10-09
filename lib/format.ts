export const money = (minor: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(minor / 100);
export const date = (iso: string) => new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeZone: 'Asia/Kolkata' }).format(new Date(iso));
export function parseMoney(input: unknown): number {
    const value = String(input ?? '');
    if (!/^\d{1,8}(\.\d{1,2})?$/.test(value))
        throw new Error('Enter a positive amount with up to two decimal places');
    const [whole, fraction = ''] = value.split('.');
    return Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
}
export const moneyInput = (minor: number) => `${Math.floor(minor / 100)}.${String(minor % 100).padStart(2, '0')}`;
