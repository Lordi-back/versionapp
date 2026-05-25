export class RiskChecker {
    constructor(sources) {
        this.riskPatterns = sources.risk_patterns || [];
    }

    check(text) {
        const issues = [];
        for (const pattern of this.riskPatterns) {
            if (text.toLowerCase().includes(pattern.pattern.toLowerCase())) {
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
