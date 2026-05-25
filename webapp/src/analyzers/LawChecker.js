export class LawChecker {
    constructor(sources) {
        this.requiredClauses = sources.required_clauses || [];
    }

    check(text) {
        const issues = [];
        for (const clause of this.requiredClauses) {
            if (!text.toLowerCase().includes(clause.clause.toLowerCase())) {
                issues.push({
                    type: 'law',
                    category: 'missing_clause',
                    quote: clause.clause,
                    issue: clause.issue,
                    recommendation: clause.recommendation,
                    severity: 'high'
                });
            }
        }
        return issues;
    }
}
