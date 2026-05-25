export class GrammarChecker {
    constructor(sources) {
        this.bureaucracy = sources.bureaucracy_phrases || [];
    }

    check(text) {
        const issues = [];
        for (const phrase of this.bureaucracy) {
            if (text.toLowerCase().includes(phrase.pattern.toLowerCase())) {
                issues.push({
                    type: 'grammar',
                    category: 'bureaucracy',
                    quote: phrase.pattern,
                    issue: phrase.issue,
                    recommendation: `Замените на: '${phrase.replacement}'`,
                    severity: 'low'
                });
            }
        }
        return issues;
    }
}
