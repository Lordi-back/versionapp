import { useState, useEffect } from 'react';
import { UnifiedAnalyzer } from './analyzers/UnifiedAnalyzer';
import sources from './data/sources.json';
import FileUpload from './components/FileUpload';
import Results from './components/Results';
import DeviceLink from './components/DeviceLink';
import './App.css';

function App() {
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

    const handleText = (text) => {
        const result = analyzer.analyze(text);
        setAnalysisResult(result);
    };

    return (
        <div className="app">
            <header>
                <h1>📄 Юридический AI Ассистент</h1>
                <p>Загрузите документ или сделайте фото</p>
            </header>

            <div className="card">
                <DeviceLink deviceId={deviceId} />
            </div>

            <div className="card">
                <FileUpload onTextExtracted={handleText} />
            </div>

            {analysisResult && (
                <div className="card">
                    <Results result={analysisResult} />
                </div>
            )}
        </div>
    );
}

export default App;
