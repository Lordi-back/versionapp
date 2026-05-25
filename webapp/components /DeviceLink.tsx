'use client';

import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://legal-ai-api-xi.vercel.app/api';

interface DeviceLinkProps {
    deviceId: string;
}

export default function DeviceLink({ deviceId }: DeviceLinkProps) {
    const [code, setCode] = useState('');
    const [generated, setGenerated] = useState('');

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
