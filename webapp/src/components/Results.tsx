export default function Results({ result }) {
    if (!result) return null;

    return (
        <div>
            <h3>{result.summary}</h3>
            <p>⚖️ Законы: {result.lawIssuesCount} | ✍️ Орфография: {result.grammarIssuesCount} | ⚠️ Риски: {result.riskIssuesCount}</p>
            {result.allIssues.map((issue, idx) => (
                <div
                    key={idx}
                    className={`issue-card issue-${issue.severity === 'high' ? 'high' : issue.severity === 'medium' ? 'medium' : 'low'}`}
                >
                    <strong>{issue.category} ({issue.severity})</strong>
                    <p>📌 {issue.quote}</p>
                    <p>❌ {issue.issue}</p>
                    <p>✅ {issue.recommendation}</p>
                </div>
            ))}
        </div>
    );
}
