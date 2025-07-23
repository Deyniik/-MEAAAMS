// В начале файла объявите переменные
const fileUploadPanel = document.getElementById('file-upload-panel');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');

// Обновите обработчик загрузки файла
uploadInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            memeImage.src = event.target.result;
            memeImage.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
            fileUploadPanel.style.display = 'block'; // Показываем панель загрузки
            downloadBtn.disabled = false; // Активируем кнопки
            shareBtn.disabled = false;
            
            memeImage.onload = function() {
                imageAspectRatio = this.naturalWidth / this.naturalHeight;
                updateFrame();
            };
        };
        reader.readAsDataURL(file);
    }
});

// Обновите функцию useTemplate
function useTemplate(img) {
    memeImage.src = img.src;
    memeImage.style.display = 'block';
    uploadPlaceholder.style.display = 'none';
    fileUploadPanel.style.display = 'block'; // Показываем панель загрузки
    downloadBtn.disabled = false; // Активируем кнопки
    shareBtn.disabled = false;
    
    memeImage.onload = function() {
        imageAspectRatio = this.naturalWidth / this.naturalHeight;
        updateFrame();
    };
}

// В функции init (или в конце файла) добавьте:
fileUploadPanel.style.display = 'none'; // Скрываем панель загрузки изначально
downloadBtn.disabled = true; // Деактивируем кнопки
shareBtn.disabled = true;
