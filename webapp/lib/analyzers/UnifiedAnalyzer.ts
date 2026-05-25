import { LawChecker } from './LawChecker';
import { GrammarChecker } from './GrammarChecker';
import { RiskChecker } from './RiskChecker';
import sources from './sources.json';

export class UnifiedAnalyzer {
    private lawChecker: LawChecker;
    private grammarChecker: GrammarChecker;
    private riskChecker: RiskChecker;

    constructor() {
        this.lawChecker = new LawChecker(sources);
        this.grammarChecker = new GrammarChecker(sources);
        this.riskChecker = new RiskChecker(sources);
    }

    analyze(text: string) {
        const lawIssues = this.lawChecker.check(text);
        const grammarIssues = this.grammarChecker.check(text);
        const riskIssues = this.riskChecker.check(text);
        const allIssues = [...lawIssues, ...grammarIssues, ...riskIssues];

        return {
            allIssues,
            lawIssuesCount: lawIssues.length,
            grammarIssuesCount: grammarIssues.length,
            riskIssuesCount: riskIssues.length,
            summary: `Найдено проблем: ${allIssues.length}`
        };
    }
}
