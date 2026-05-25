import { useState, useEffect } from 'react';
import { UnifiedAnalyzer } from '.analyzersUnifiedAnalyzer';
import sources from '.datasources.json';
import FileUpload from '.componentsFileUpload';
import Results from '.componentsResults';
import DeviceLink from '.componentsDeviceLink';
import '.App.css';

function App() {
    const [deviceId, setDeviceId] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);

    useEffect(() = {
        let id = localStorage.getItem('deviceId');
        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem('deviceId', id);
        }
        setDeviceId(id);
    }, []);

    const analyzer = new UnifiedAnalyzer(sources);

    const handleText = (text) = {
        const result = analyzer.analyze(text);
        setAnalysisResult(result);
    };

    return (
        div className=app
            header
                h1?? Юридический AI Ассистентh1
                pЗагрузите документ или сделайте фотоp
            header

            div className=card
                DeviceLink deviceId={deviceId} 
            div

            div className=card
                FileUpload onTextExtracted={handleText} 
            div

            {analysisResult && (
                div className=card
                    Results result={analysisResult} 
                div
            )}
        div
    );
}

export default App;
