import { useState, useEffect } from 'react';
import { UnifiedAnalyzer } from './analyzers/UnifiedAnalyzer';
import sources from './data/sources.json';
import FileUpload from './components/FileUpload';
import Results from './components/Results';
import DeviceLink from './components/DeviceLink';

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
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
            <h1>Юридический AI Ассистент</h1>
            <DeviceLink deviceId={deviceId} />
            <FileUpload onTextExtracted={handleText} />
            <Results result={analysisResult} />
        </div>
    );
}

export default App;
