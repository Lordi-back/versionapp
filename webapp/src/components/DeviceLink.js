import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://legal-ai-api-xi.vercel.app/api';

export default function DeviceLink({ deviceId }) {
    const [code, setCode] = useState('');
    const [generated, setGenerated] = useState('');

    const generateCode = async () => {
        const res = await axios.post(`${API_BASE}/generate-code`, { hardwareId: deviceId });
        setGenerated(res.data.code);
    };

    const linkDevice = async () => {
        await axios.post(`${API_BASE}/link-device`, { code, deviceId });
        alert('Устройство привязано!');
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <button onClick={generateCode}>Сгенерировать код</button>
            {generated && <p>Ваш код: {generated}</p>}
            <input value={code} onChange={e => setCode(e.target.value)} placeholder="Введите код с ПК" />
            <button onClick={linkDevice}>Привязать</button>
        </div>
    );
}
