interface RiskPattern {
    pattern: string;
    issue: string;
    recommendation: string;
    severity: string;
}

interface Sources {
    risk_patterns: RiskPattern[];
}

export class RiskChecker {
    private riskPatterns: RiskPattern[];

    constructor(sources: Sources) {
        this.riskPatterns = sources.risk_patterns || [];
    }

    check(text: string) {
        const issues: any[] = [];
        const lowerText = text.toLowerCase();
        for (const pattern of this.riskPatterns) {
            if (lowerText.includes(pattern.pattern.toLowerCase())) {
                issues.push({
                    type: 'risk',
                    category: 'legal_risk',
                    quote: pattern.pattern,
                    issue: pattern.issue,
                    recommendation: pattern.recommendation,
                    severity: pattern.severity || 'medium'
                });
            }
        }
        return issues;
    }
}
