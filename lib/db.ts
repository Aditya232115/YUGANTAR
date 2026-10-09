import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { Database } from '@/types';
import { createSeed } from '@/data/seed';
const dir = path.join(process.cwd(), 'data'), file = path.join(dir, 'db.json'), lock = path.join(dir, '.lock');
let queue: Promise<unknown> = Promise.resolve();
async function acquire() { await fs.mkdir(dir, { recursive: true }); const start = Date.now(); for (;;) {
    try {
        return await fs.open(lock, 'wx');
    }
    catch (e) {
        if ((e as NodeJS.ErrnoException).code !== 'EEXIST')
            throw e;
        if (Date.now() - start > 15000)
            throw new Error('Database is busy. If the server crashed, stop it and remove data/.lock.');
        await new Promise(r => setTimeout(r, 30));
    }
} }
async function transaction<T>(fn: (db: Database) => T | Promise<T>, write: boolean): Promise<T> { const handle = await acquire(); try {
    let db: Database;
    try {
        db = JSON.parse(await fs.readFile(file, 'utf8')) as Database;
    }
    catch (e) {
        if ((e as NodeJS.ErrnoException).code !== 'ENOENT')
            throw e;
        db = createSeed();
        await save(db);
    }
    const result = await fn(db);
    if (write)
        await save(db);
    return result;
}
finally {
    await handle.close();
    await fs.unlink(lock);
} }
async function save(db: Database) { const tmp = path.join(dir, `db-${process.pid}-${Date.now()}.tmp`); await fs.writeFile(tmp, JSON.stringify(db, null, 2)); await fs.rename(tmp, file); }
function run<T>(fn: (db: Database) => T | Promise<T>, write: boolean): Promise<T> { const next = queue.then(() => transaction(fn, write)); queue = next.catch(() => undefined); return next; }
export const readDb = <T>(fn: (db: Database) => T | Promise<T>) => run(fn, false);
export const mutateDb = <T>(fn: (db: Database) => T | Promise<T>) => run(fn, true);
