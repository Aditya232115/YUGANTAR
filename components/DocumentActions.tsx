'use client';
export default function DocumentActions({ name }: {
    name: string;
}) { function download() { const node = document.getElementById('billing-document'); if (!node)
    return; const css = Array.from(document.styleSheets).flatMap(sheet => { try {
    return Array.from(sheet.cssRules).map(rule => rule.cssText);
}
catch {
    return [];
} }).join('\n'); const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${name}</title><style>${css}</style><style>html,body{background:white;color:#172033}.document{margin:0 auto}</style></head><body>${node.outerHTML}</body></html>`; const url = URL.createObjectURL(new Blob([html], { type: 'text/html;charset=utf-8' })); const a = document.createElement('a'); a.href = url; a.download = `${name}.html`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); } return <div className="document-actions no-print"><button className="button" onClick={() => window.print()}>Download / Print</button><button className="button secondary" onClick={download}>Download .html</button></div>; }
