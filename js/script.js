const uploadMain = document.getElementById('upload-main');
const memeImage = document.getElementById('meme-image');
const topTextElement = document.getElementById('top-text');
const bottomTextElement = document.getElementById('bottom-text');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');

let shareableUrl = null;

// Обработчик загрузки изображения
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            memeImage.src = event.target.result;
            memeImage.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

uploadMain.addEventListener('change', handleFileUpload);

// Функция скачивания мема
function downloadMeme() {
    if (!memeImage.src) {
        alert('Сначала загрузи изображение!');
        return;
    }

    html2canvas(memeImage).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'meme.png';
        link.click();
    });
}

// Функция для того чтобы поделиться мемом
async function shareMeme() {
    if (!memeImage.src) {
        alert('Сначала создайте мем!');
        return;
    }

    try {
        const canvas = await html2canvas(memeImage);
        const blob = await canvas.toBlob();
        const formData = new FormData();
        formData.append('image', blob, 'meme.png');

        const response = await fetch('https://api.imgbb.com/1/upload?key=YOUR_API_KEY', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            const imageUrl = data.data.url;
            await navigator.clipboard.writeText(imageUrl);
            alert('Ссылка на мем скопирована в буфер обмена!');
        } else {
            alert('Ошибка при загрузке изображения');
        }
    } catch (error) {
        alert('Ошибка при создании мема');
    }
}

downloadBtn.disabled = false;
shareBtn.disabled = false;
