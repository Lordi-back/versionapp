interface RequiredClause {
    clause: string;
    issue: string;
    recommendation: string;
}

interface Sources {
    required_clauses: RequiredClause[];
}

export class LawChecker {
    private requiredClauses: RequiredClause[];

    constructor(sources: Sources) {
        this.requiredClauses = sources.required_clauses || [];
    }

    check(text: string) {
        const issues: any[] = [];
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
