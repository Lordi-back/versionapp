import { useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';
import Tesseract from 'tesseract.js';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function FileUpload({ onTextExtracted }) {
    const fileInput = useRef();
    const cameraInput = useRef();

    const extractFromFile = async (file) => {
        let text = '';
        const type = file.type;
        const ext = file.name.split('.').pop().toLowerCase();

        if (type === 'application/pdf' || ext === 'pdf') {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                text += content.items.map(item => item.str).join(' ');
            }
        } else if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || ext === 'docx') {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            text = result.value;
        } else if (type === 'text/plain' || ext === 'txt') {
            text = await file.text();
        } else {
            throw new Error('Неподдерживаемый формат файла');
        }
        onTextExtracted(text);
    };

    const handlePhoto = async (file) => {
        const { data: { text } } = await Tesseract.recognize(file, 'rus+eng');
        onTextExtracted(text);
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <input type="file" ref={fileInput} onChange={e => extractFromFile(e.target.files[0])} />
            <input type="file" ref={cameraInput} accept="image/*" capture="environment" onChange={e => handlePhoto(e.target.files[0])} />
        </div>
    );
}
