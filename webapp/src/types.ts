export interface Issue {
    type: string;
    category: string;
    quote: string;
    issue: string;
    recommendation: string;
    severity: string;
}

export interface AnalysisResult {
    allIssues: Issue[];
    lawIssuesCount: number;
    grammarIssuesCount: number;
    riskIssuesCount: number;
    summary: string;
}
