'use client';

import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import Results from '../components/Results';
import DeviceLink from '../components/DeviceLink';
import { UnifiedAnalyzer } from '@/lib/analyzers/UnifiedAnalyzer';
import sources from '@/lib/analyzers/sources.json';

export default function Home() {
    const [deviceId, setDeviceId] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() => {
        let id = localStorage.getItem('deviceId');
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem('deviceId', id);
        }
        setDeviceId(id);
    }, []);

    const analyzer = new UnifiedAnalyzer(sources);

    const handleText = (text: string) => {
        const result = analyzer.analyze(text);
        setAnalysisResult(result);
    };

    return (
        <main className="max-w-4xl mx-auto p-4 font-sans">
            <header className="bg-white rounded-2xl shadow-sm p-4 text-center mb-6">
                <h1 className="text-2xl font-bold text-[#007ACC]">📄 Юридический AI Ассистент</h1>
                <p className="text-gray-500 text-sm">Загрузите документ или сделайте фото</p>
            </header>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <DeviceLink deviceId={deviceId} />
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                <FileUpload onTextExtracted={handleText} />
            </div>

            {analysisResult && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <Results result={analysisResult} />
                </div>
            )}
        </main>
    );
}
