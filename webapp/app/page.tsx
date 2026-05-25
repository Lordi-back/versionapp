'use client';

import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';      // <-- относительный путь
import Results from '../components/Results';            // <-- относительный путь
import DeviceLink from '../components/DeviceLink';      // <-- относительный путь
import { UnifiedAnalyzer } from '../lib/analyzers/UnifiedAnalyzer'; // <-- относительный путь

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

    const analyzer = new UnifiedAnalyzer();

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
