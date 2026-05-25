'use client';

import React, { useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface FileUploadProps {
    onTextExtracted: (text: string) => void;
}

export default function FileUpload({ onTextExtracted }: FileUploadProps) {
    const fileInput = useRef<HTMLInputElement>(null);
    const cameraInput = useRef<HTMLInputElement>(null);

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
