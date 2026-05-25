'use client';

import { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import { UnifiedAnalyzer } from '../lib/analyzers/UnifiedAnalyzer';

// Компонент DeviceLink (встроен)
function DeviceLink({ deviceId }: { deviceId: string }) {
    const [code, setCode] = useState('');
    const [generated, setGenerated] = useState('');
    const API_BASE = 'https://legal-ai-api-xi.vercel.app/api';

    const generateCode = async () => {
        try {
            const res = await axios.post(`${API_BASE}/generate-code`, { hardwareId: deviceId });
            setGenerated(res.data.code);
        } catch (error) {
            console.error(error);
            alert('Ошибка генерации кода');
        }
    };

    const linkDevice = async () => {
        try {
            await axios.post(`${API_BASE}/link-device`, { code, deviceId });
            alert('Устройство привязано!');
        } catch (error) {
            console.error(error);
            alert('Ошибка привязки');
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <button onClick={generateCode} className="bg-blue-600 text-white px-4 py-2 rounded-full">Сгенерировать код</button>
            {generated && <p>Ваш код: {generated}</p>}
            <input value={code} onChange={e => setCode(e.target.value)} placeholder="Введите код с ПК" className="border rounded-full px-4 py-2" />
            <button onClick={linkDevice} className="bg-green-600 text-white px-4 py-2 rounded-full">Привязать</button>
        </div>
    );
}

// Компонент FileUpload (встроен)
function FileUpload({ onTextExtracted }: { onTextExtracted: (text: string) => void }) {
    const fileInput = useRef<HTMLInputElement>(null);
    const cameraInput = useRef<HTMLInputElement>(null);

    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    const extractFromFile = async (file: File) => {
        let text = '';
        const ext = file.name.split('.').pop()?.toLowerCase();

        if (ext === 'pdf') {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                text += content.items.map((item: any) => item.str).join(' ');
            }
        } else if (ext === 'docx') {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            text = result.value;
        } else {
            text = await file.text();
        }
        onTextExtracted(text);
    };

    const handlePhoto = async (file: File) => {
        const { data: { text } } = await Tesseract.recognize(file, 'rus+eng');
        onTextExtracted(text);
    };

    return (
        <div className="flex flex-col gap-4">
            <input type="file" ref={fileInput} onChange={e => e.target.files && extractFromFile(e.target.files[0])} />
            <input type="file" ref={cameraInput} accept="image/*" capture="environment" onChange={e => e.target.files && handlePhoto(e.target.files[0])} />
        </div>
    );
}

// Компонент Results (встроен)
function Results({ result }: { result: any }) {
    if (!result) return null;

    return (
        <div>
            <h3 className="text-xl font-semibold mb-2">{result.summary}</h3>
            <p className="text-gray-600 mb-4">⚖️ Законы: {result.lawIssuesCount} | ✍️ Орфография: {result.grammarIssuesCount} | ⚠️ Риски: {result.riskIssuesCount}</p>
            {result.allIssues.map((issue: any, idx: number) => (
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

// Главный компонент страницы
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
