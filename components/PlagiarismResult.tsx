import type { PlagiarismCheck } from '@/types';
export default function PlagiarismResult({ result }: {
    result: PlagiarismCheck;
}) { return <div className="notice"><strong>{result.status}</strong><ul>{result.checks.map((s, i) => <li key={i}>{s}</li>)}</ul>{result.advisory && <p>AI review (advisory): {result.advisory}</p>}<small>Checks within YUGANTAR and basic risk only; no internet-wide originality guarantee.</small></div>; }
