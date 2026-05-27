const API_KEY = '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';
const API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';

const generateBtn = document.getElementById('generateBtn');
const promptInput = document.getElementById('prompt');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const resultImage = document.getElementById('resultImage');

generateBtn.addEventListener('click', generateImage);

async function generateImage() {
    const prompt = promptInput.value.trim();
    
    if (!prompt) {
        alert('Vui lòng nhập mô tả hình ảnh!');
        return;
    }
    
    loading.style.display = 'block';
    result.style.display = 'none';
    generateBtn.disabled = true;
    
    try {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
            method: 'POST',
            body: JSON.stringify({ inputs: prompt }),
        });
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        resultImage.src = url;
        
        loading.style.display = 'none';
        result.style.display = 'block';
    } catch (error) {
        alert('Lỗi: ' + error.message);
        loading.style.display = 'none';
    } finally {
        generateBtn.disabled = false;
    }
}
