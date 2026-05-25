interface BureaucracyPhrase {
    pattern: string;
    replacement: string;
    issue: string;
}

interface Sources {
    bureaucracy_phrases: BureaucracyPhrase[];
}

export class GrammarChecker {
    private bureaucracyPhrases: BureaucracyPhrase[];

    constructor(sources: Sources) {
        this.bureaucracyPhrases = sources.bureaucracy_phrases || [];
    }

    check(text: string) {
        const issues: any[] = [];
        const lowerText = text.toLowerCase();
        for (const phrase of this.bureaucracyPhrases) {
            if (lowerText.includes(phrase.pattern.toLowerCase())) {
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
