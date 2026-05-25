export default function Results({ result }) {
    if (!result) return null;
    return (
        <div>
            <h3>{result.summary}</h3>
            <p>Законы: {result.lawIssuesCount} | Орфография: {result.grammarIssuesCount} | Риски: {result.riskIssuesCount}</p>
            {result.allIssues.map((issue, idx) => (
                <div key={idx} style={{ background: issue.severity === 'high' ? '#ffebee' : '#fff8e1', marginBottom: '1rem', padding: '0.5rem' }}>
                    <strong>{issue.category} ({issue.severity})</strong>
                    <p>📌 {issue.quote}</p>
                    <p>❌ {issue.issue}</p>
                    <p>✅ {issue.recommendation}</p>
                </div>
            ))}
        </div>
    );
}
