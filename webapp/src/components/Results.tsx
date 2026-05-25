import React from 'react';
import { AnalysisResult } from '../types';

interface Issue {
    category: string;
    severity: string;
    quote: string;
    issue: string;
    recommendation: string;
}

interface AnalysisResult {
    allIssues: Issue[];
    lawIssuesCount: number;
    grammarIssuesCount: number;
    riskIssuesCount: number;
    summary: string;
}

interface ResultsProps {
    result: AnalysisResult;
}

export default function Results({ result }: ResultsProps) {
    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">{result.summary}</h3>
            <p className="text-gray-600 mb-4">⚖️ Законы: {result.lawIssuesCount} | ✍️ Орфография: {result.grammarIssuesCount} | ⚠️ Риски: {result.riskIssuesCount}</p>
            {result.allIssues.map((issue, idx) => (
                <div key={idx} className={`mb-4 p-4 rounded-xl ${issue.severity === 'high' ? 'bg-red-50 border-l-4 border-red-500' : issue.severity === 'medium' ? 'bg-yellow-50 border-l-4 border-yellow-500' : 'bg-green-50 border-l-4 border-green-500'}`}>
                    <strong className="block mb-2">{issue.category} ({issue.severity})</strong>
                    <p className="italic text-gray-700">📌 {issue.quote}</p>
                    <p className="text-gray-700">❌ {issue.issue}</p>
                    <p className="text-green-700">✅ {issue.recommendation}</p>
                </div>
            ))}
        </div>
    );
}
