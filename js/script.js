// Элементы управления
const uploadInput = document.getElementById('upload');
const uploadMain = document.getElementById('upload-main');
const topTextInput = document.getElementById('text-top');
const bottomTextInput = document.getElementById('text-bottom');
const fontFamilySelect = document.getElementById('font-family');
const fontSizeSlider = document.getElementById('font-size');
const fontSizeValue = document.getElementById('font-size-value');
const textColorInput = document.getElementById('text-color');
const colorHex = document.getElementById('color-hex');
const strokeColorInput = document.getElementById('stroke-color');
const strokeWidthSlider = document.getElementById('stroke-width');
const strokeWidthValue = document.getElementById('stroke-width-value');
const memeImage = document.getElementById('meme-image');
const topTextElement = document.getElementById('top-text');
const bottomTextElement = document.getElementById('bottom-text');
const templatesContainer = document.getElementById('templates-container');
const memeContainer = document.getElementById('meme-container');
const frameToggle = document.getElementById('frame-toggle');
const frameSizeSlider = document.getElementById('frame-size');
const frameSizeValue = document.getElementById('frame-size-value');
const frameOverlay = document.getElementById('frame-overlay');
const framedImage = document.getElementById('framed-image');
const frameSizeControl = document.getElementById('frame-size-control');
const topTextBackground = document.getElementById('top-text-background');
const bottomTextBackground = document.getElementById('bottom-text-background');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const downloadBtn = document.getElementById('download-btn');
const shareBtn = document.getElementById('share-btn');
const smartMemeBtn = document.getElementById('smart-meme-btn');
const formatToggle = document.getElementById('format-toggle');

// Популярные шаблоны мемов
const memeTemplates = [
    "https://i.imgflip.com/1bij.jpg", // Ждун
    "https://i.imgflip.com/1bgw.jpg", // Кот
    "https://i.imgflip.com/9vct.jpg", // Драма
    "https://i.imgflip.com/1g8my.jpg", // Два парня
    "https://i.imgflip.com/1ihzfe.jpg", // Дрейк
    "https://i.imgflip.com/1h7in3.jpg", // Леонардо ДиКаприо
    "https://i.imgflip.com/9ehk.jpg", // Один парень
    "https://i.imgflip.com/gtj5t.jpg", // Смена канала
    "https://i.imgflip.com/1o00in.jpg", // Женщина кричит на кота
    "https://i.imgflip.com/4/1g8my.jpg" // Два парня за столом
];

// Текущее соотношение сторон изображения
let imageAspectRatio = 1;
// URL для общего доступа
let shareableUrl = null;
// Текущие настройки стиля
let currentStyle = {
    fontFamily: 'Impact',
    fontSize: '42px',
    textColor: '#ffffff',
    strokeColor: '#000000',
    strokeWidth: '1px',
    textEffect: 'none',
    filter: 'none',
    frameEnabled: false,
    frameSize: 10,
    textPosition: 'both',
    squareFormat: false
};

// Шутки для мемов
const memeJokes = [
    ["Это не баг", "Это фича"],
    ["Программист спит", "Код работает"],
    ["Утро начинается", "С кофе и ошибок"],
    ["Сначала работа", "Потом магия"],
    ["Я не ленивый", "Я на энергосбережении"],
    ["404", "Остроумие не найдено"],
    ["Ctrl+C", "Ctrl+V"],
    ["Быстро, дешево, качественно", "Выбери два"],
    ["Понедельник меня не любит", "И я его тоже"],
    ["Я не прокрастинирую", "Я заряжаюсь"],
    ["Спасибо, что объяснил", "Теперь я вообще ничего не понимаю"],
    ["Мой код", "Мои проблемы"],
    ["Думаю о хорошем", "Но получается как всегда"],
    ["Хочу быть продуктивным", "Но Netflix зовет"],
    ["План на сегодня", "Ничего не делать"],
    ["Я не странный", "Я ограниченный выпуск"],
    ["Счастье есть", "Но не для всех"],
    ["Жизнь прекрасна", "Когда закрываешь глаза"],
    ["Мечты сбываются", "Но не твои"],
    ["Все будет хорошо", "Но не сразу"],
    ["Лучше поздно", "Чем никогда"],
    ["Смех без причины", "Признак мема"],
    ["Ты не одинок", "Но всем все равно"],
    ["Будь собой", "Но лучше не надо"],
    ["Улыбайся чаще", "Особенно когда грустно"],
    ["Все получится", "Или нет"],
    ["Я не неудачник", "Я прелюдия к успеху"],
    ["Завтра новый день", "И новые проблемы"],
    ["Жизнь - это не боль", "Это хроническое заболевание"],
    ["Все идет по плану", "Но плана нет"],
    ["Я не ошибка", "Я фича"],
    ["Код не работает", "И я не знаю почему"],
    ["Код работает", "И я не знаю почему"],
    ["Пытался исправить баг", "Создал два новых"],
    ["Гуглил ошибку", "Нашел свой же вопрос"],
    ["Начал проект", "Уже жалею"],
    ["Дедлайн близко", "А я в интернете"],
    ["Сложно быть гением", "Но кто-то же должен"],
    ["Не стрессую", "Просто так выгляжу"],
    ["Не ленивый", "Эффективный"],
    ["Не грустный", "Просто лицо такое"],
    ["Не кричу", "Просто громко говорю"],
    ["Не сплю", "Просто тестирую кровать"],
    ["Не опаздываю", "Просто иду по своему времени"],
    ["Не забыл", "Просто не сделал"],
    ["Не ошибся", "Просто альтернативный вариант"],
    ["Не сдаюсь", "Просто делаю перерыв"],
    ["Не туплю", "Просто думаю"],
    ["Не вру", "Просто фантазирую"],
    ["Не криворукий", "Просто левша"]
];

// Функция загрузки случайных шаблонов
function loadRandomTemplates() {
    templatesContainer.innerHTML = '';
    
    const shuffled = [...memeTemplates].sort(() => 0.5 - Math.random());
    const selectedTemplates = shuffled.slice(0, 3);
    
    selectedTemplates.forEach(template => {
        const img = document.createElement('img');
        img.src = template;
        img.className = 'template';
        img.onclick = function() { useTemplate(this); };
        templatesContainer.appendChild(img);
    });
}

// Переключение панелей с анимацией
function togglePanel(panelId) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        if (panel.id !== panelId) {
            panel.style.display = 'none';
        }
    });
    
    const panel = document.getElementById(panelId);
    if (panel.style.display === 'grid') {
        panel.style.display = 'none';
    } else {
        panel.style.display = 'grid';
        // Прокручиваем к панели, если она не видна
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Применение эффектов к тексту
function applyTextEffect(effect) {
    currentStyle.textEffect = effect;
    
    // Сбрасываем все эффекты
    topTextElement.style.background = '';
    topTextElement.style.webkitTextFillColor = '';
    topTextElement.style.textShadow = '';
    topTextElement.style.animation = '';
    bottomTextElement.style.background = '';
    bottomTextElement.style.webkitTextFillColor = '';
    bottomTextElement.style.textShadow = '';
    bottomTextElement.style.animation = '';
    
    switch(effect) {
        case 'gradient':
            const gradient = `linear-gradient(to right, ${textColorInput.value}, ${getRandomColor()})`;
            topTextElement.style.background = gradient;
            topTextElement.style.webkitBackgroundClip = 'text';
            topTextElement.style.webkitTextFillColor = 'transparent';
            bottomTextElement.style.background = gradient;
            bottomTextElement.style.webkitBackgroundClip = 'text';
            bottomTextElement.style.webkitTextFillColor = 'transparent';
            break;
            
        case 'neon':
            const neonColor = textColorInput.value || '#ffffff';
            const neonShadow = `0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 20px ${neonColor}`;
            topTextElement.style.textShadow = neonShadow;
            bottomTextElement.style.textShadow = neonShadow;
            break;
            
        case 'outline':
            topTextElement.style.webkitTextStroke = `2px ${textColorInput.value}`;
            topTextElement.style.webkitTextFillColor = 'transparent';
            bottomTextElement.style.webkitTextStroke = `2px ${textColorInput.value}`;
            bottomTextElement.style.webkitTextFillColor = 'transparent';
            break;
            
        case 'shadow':
            topTextElement.style.textShadow = '3px 3px 0 rgba(0,0,0,0.5)';
            bottomTextElement.style.textShadow = '3px 3px 0 rgba(0,0,0,0.5)';
            break;
            
        case 'rainbow':
            topTextElement.style.animation = 'rainbow 3s linear infinite';
            bottomTextElement.style.animation = 'rainbow 3s linear infinite';
            break;
            
        case 'glow':
            topTextElement.style.animation = 'glow 2s ease-in-out infinite alternate';
            bottomTextElement.style.animation = 'glow 2s ease-in-out infinite alternate';
            break;
            
        case '3d':
            const textShadow = [];
            for (let i = 1; i <= 5; i++) {
                textShadow.push(`${i}px ${i}px 0 ${getRandomColor()}`);
            }
            topTextElement.style.textShadow = textShadow.join(', ');
            bottomTextElement.style.textShadow = textShadow.join(', ');
            break;
    }
}

// Применение фильтров
function applyFilter(filter) {
    currentStyle.filter = filter;
    memeImage.style.filter = filter;
    framedImage.style.filter = filter;
}

// Винтажный фильтр
function applyVintageFilter() {
    currentStyle.filter = 'sepia(70%) brightness(80%) contrast(120%) saturate(80%)';
    memeImage.style.filter = currentStyle.filter;
    framedImage.style.filter = currentStyle.filter;
}

// Пиксельный эффект
function applyPixelEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = memeImage.naturalWidth;
    canvas.height = memeImage.naturalHeight;
    
    const pixelSize = Math.max(5, Math.min(canvas.width, canvas.height) / 20);
    
    // Уменьшаем изображение
    ctx.drawImage(memeImage, 0, 0, canvas.width / pixelSize, canvas.height / pixelSize);
    // Увеличиваем обратно
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, canvas.width / pixelSize, canvas.height / pixelSize, 
                  0, 0, canvas.width, canvas.height);
    
    const tempImg = new Image();
    tempImg.src = canvas.toDataURL();
    
    tempImg.onload = function() {
        memeImage.src = this.src;
        framedImage.src = this.src;
        applyFilter('none');
    };
}

// Эффект размытия
function applyBlurEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = memeImage.naturalWidth;
    canvas.height = memeImage.naturalHeight;
    
    ctx.filter = 'blur(5px)';
    ctx.drawImage(memeImage, 0, 0, canvas.width, canvas.height);
    
    const tempImg = new Image();
    tempImg.src = canvas.toDataURL();
    
    tempImg.onload = function() {
        memeImage.src = this.src;
        framedImage.src = this.src;
        applyFilter('none');
    };
}

// Эффект шума
function applyNoiseEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = memeImage.naturalWidth;
    canvas.height = memeImage.naturalHeight;
    
    ctx.drawImage(memeImage, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 50 - 25;
        data[i] += noise;     // R
        data[i+1] += noise;   // G
        data[i+2] += noise;   // B
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    const tempImg = new Image();
    tempImg.src = canvas.toDataURL();
    
    tempImg.onload = function() {
        memeImage.src = this.src;
        framedImage.src = this.src;
        applyFilter('none');
    };
}

// Эффект виньетки
function applyVignetteEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = memeImage.naturalWidth;
    canvas.height = memeImage.naturalHeight;
    
    ctx.drawImage(memeImage, 0, 0);
    
    const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, canvas.width*0.4,
        canvas.width/2, canvas.height/2, canvas.width*0.6
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.7)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const tempImg = new Image();
    tempImg.src = canvas.toDataURL();
    
    tempImg.onload = function() {
        memeImage.src = this.src;
        framedImage.src = this.src;
        applyFilter('none');
    };
}

// Эффект постеризации
function applyPosterizeEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = memeImage.naturalWidth;
    canvas.height = memeImage.naturalHeight;
    
    ctx.drawImage(memeImage, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const levels = 4;
    
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.floor(data[i] / 255 * levels) / levels * 255;     // R
        data[i+1] = Math.floor(data[i+1] / 255 * levels) / levels * 255; // G
        data[i+2] = Math.floor(data[i+2] / 255 * levels) / levels * 255; // B
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    const tempImg = new Image();
    tempImg.src = canvas.toDataURL();
    
    tempImg.onload = function() {
        memeImage.src = this.src;
        framedImage.src = this.src;
        applyFilter('none');
    };
}

// Эффект краев
function applyEdgeEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = memeImage.naturalWidth;
    canvas.height = memeImage.naturalHeight;
    
    ctx.filter = 'grayscale(100%) contrast(200%)';
    ctx.drawImage(memeImage, 0, 0);
    
    const tempImg = new Image();
    tempImg.src = canvas.toDataURL();
    
    tempImg.onload = function() {
        memeImage.src = this.src;
        framedImage.src = this.src;
        applyFilter('none');
    };
}

// Сброс эффектов изображения
function applyNoneEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = memeImage.naturalWidth;
    canvas.height = memeImage.naturalHeight;
    
    ctx.drawImage(memeImage, 0, 0);
    
    const tempImg = new Image();
    tempImg.src = canvas.toDataURL();
    
    tempImg.onload = function() {
        memeImage.src = this.src;
        framedImage.src = this.src;
        applyFilter('none');
    };
}

// Установка позиции текста
function setTextPosition(position) {
    currentStyle.textPosition = position;
    
    switch(position) {
        case 'top':
            topTextElement.style.display = 'block';
            bottomTextElement.style.display = 'none';
            topTextBackground.style.display = 'block';
            bottomTextBackground.style.display = 'none';
            break;
            
        case 'bottom':
            topTextElement.style.display = 'none';
            bottomTextElement.style.display = 'block';
            topTextBackground.style.display = 'none';
            bottomTextBackground.style.display = 'block';
            break;
            
        case 'both':
            topTextElement.style.display = 'block';
            bottomTextElement.style.display = 'block';
            topTextBackground.style.display = 'block';
            bottomTextBackground.style.display = 'block';
            break;
            
        case 'center':
            topTextElement.style.display = 'none';
            bottomTextElement.style.display = 'none';
            topTextBackground.style.display = 'none';
            bottomTextBackground.style.display = 'none';
            
            let centerText = document.getElementById('center-text');
            if (!centerText) {
                centerText = document.createElement('div');
                centerText.id = 'center-text';
                centerText.className = 'meme-text';
                centerText.contentEditable = 'true';
                centerText.style.position = 'absolute';
                centerText.style.top = '50%';
                centerText.style.left = '5%';
                centerText.style.width = '90%';
                centerText.style.textAlign = 'center';
                centerText.style.transform = 'translateY(-50%)';
                centerText.style.zIndex = '10';
                centerText.style.color = currentStyle.textColor;
                centerText.style.fontFamily = currentStyle.fontFamily;
                centerText.style.fontSize = currentStyle.fontSize;
                centerText.style.webkitTextStroke = `${currentStyle.strokeWidth} ${currentStyle.strokeColor}`;
                memeContainer.appendChild(centerText);
            } else {
                centerText.style.display = 'block';
            }
            break;
    }
}

// Обновление мема
function updateMeme() {
    topTextElement.textContent = topTextInput.value;
    bottomTextElement.textContent = bottomTextInput.value;
    
    currentStyle.fontFamily = fontFamilySelect.value;
    currentStyle.fontSize = fontSizeSlider.value + 'px';
    currentStyle.textColor = textColorInput.value;
    currentStyle.strokeColor = strokeColorInput.value;
    currentStyle.strokeWidth = strokeWidthSlider.value + 'px';
    
    topTextElement.style.fontFamily = currentStyle.fontFamily;
    bottomTextElement.style.fontFamily = currentStyle.fontFamily;
    
    topTextElement.style.fontSize = currentStyle.fontSize;
    bottomTextElement.style.fontSize = currentStyle.fontSize;
    
    topTextElement.style.color = currentStyle.textColor;
    bottomTextElement.style.color = currentStyle.textColor;
    
    topTextElement.style.webkitTextStroke = `${currentStyle.strokeWidth} ${currentStyle.strokeColor}`;
    bottomTextElement.style.webkitTextStroke = `${currentStyle.strokeWidth} ${currentStyle.strokeColor}`;
    
    fontSizeValue.textContent = currentStyle.fontSize;
    colorHex.textContent = currentStyle.textColor.toUpperCase();
    strokeWidthValue.textContent = currentStyle.strokeWidth;
    
    const textHeight = parseInt(currentStyle.fontSize) * 2;
    topTextBackground.style.height = textHeight + 'px';
    bottomTextBackground.style.height = textHeight + 'px';
    
    applyTextEffect(currentStyle.textEffect);
    applyFilter(currentStyle.filter);
    
    updateFrame();
    updateImageFormat();
}

// Обновление рамки
function updateFrame() {
    if (currentStyle.frameEnabled && memeImage.src) {
        const frameSizePercent = currentStyle.frameSize;
        const containerWidth = memeContainer.clientWidth;
        const containerHeight = memeContainer.clientHeight;
        
        const frameSize = Math.min(containerWidth, containerHeight) * frameSizePercent / 100;
        
        frameOverlay.style.display = 'block';
        framedImage.style.display = 'block';
        memeImage.style.display = 'none';
        
        framedImage.src = memeImage.src;
        framedImage.style.width = `calc(100% - ${frameSize * 2}px)`;
        framedImage.style.height = `calc(100% - ${frameSize * 2}px)`;
        framedImage.style.left = `${frameSize}px`;
        framedImage.style.top = `${frameSize}px`;
        
        frameOverlay.style.width = '100%';
        frameOverlay.style.height = '100%';
    } else {
        frameOverlay.style.display = 'none';
        framedImage.style.display = 'none';
        memeImage.style.display = 'block';
    }
}

// Обновление формата изображения
function updateImageFormat() {
    if (currentStyle.squareFormat && memeImage.src) {
        memeImage.style.objectFit = 'cover';
        framedImage.style.objectFit = 'cover';
    } else {
        memeImage.style.objectFit = 'contain';
        framedImage.style.objectFit = 'contain';
    }
}

// Случайный шрифт
function randomFont() {
    const fonts = Array.from(fontFamilySelect.options).map(opt => opt.value);
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    fontFamilySelect.value = randomFont;
    updateMeme();
}

// Генерация случайного цвета
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Загрузка изображения (основная кнопка)
uploadMain.addEventListener('change', function(e) {
    handleFileUpload(e, uploadMain);
});

// Загрузка изображения (маленькая кнопка)
uploadInput.addEventListener('change', function(e) {
    handleFileUpload(e, uploadInput);
});

// Обработчик загрузки файла
function handleFileUpload(e, inputElement) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            memeImage.src = event.target.result;
            memeImage.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
            downloadBtn.disabled = false;
            shareBtn.disabled = false;
            
            memeImage.onload = function() {
                imageAspectRatio = this.naturalWidth / this.naturalHeight;
                updateFrame();
                updateImageFormat();
            };
            
            // Сброс значения input, чтобы можно было загрузить тот же файл снова
            inputElement.value = '';
        };
        reader.readAsDataURL(file);
    }
}

// Обработчик вставки из буфера обмена
document.addEventListener('paste', function(e) {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
            const blob = items[i].getAsFile();
            const reader = new FileReader();
            reader.onload = function(event) {
                memeImage.src = event.target.result;
                memeImage.style.display = 'block';
                uploadPlaceholder.style.display = 'none';
                downloadBtn.disabled = false;
                shareBtn.disabled = false;
                
                memeImage.onload = function() {
                    imageAspectRatio = this.naturalWidth / this.naturalHeight;
                    updateFrame();
                    updateImageFormat();
                };
            };
            reader.readAsDataURL(blob);
            break;
        }
    }
});

// Использование шаблона
function useTemplate(img) {
    memeImage.src = img.src;
    memeImage.style.display = 'block';
    uploadPlaceholder.style.display = 'none';
    downloadBtn.disabled = false;
    shareBtn.disabled = false;
    
    memeImage.onload = function() {
        imageAspectRatio = this.naturalWidth / this.naturalHeight;
        updateFrame();
        updateImageFormat();
    };
}

// Умная генерация мема
function generateSmartMeme() {
    if (!memeImage.src) {
        loadRandomTemplates();
        setTimeout(() => {
            const templates = document.querySelectorAll('.template');
            if (templates.length > 0) {
                useTemplate(templates[Math.floor(Math.random() * templates.length)]);
            }
        }, 100);
    }
    
    const randomTemplate = memeJokes[Math.floor(Math.random() * memeJokes.length)];
    topTextInput.value = randomTemplate[0];
    bottomTextInput.value = randomTemplate[1];
    
    updateMeme();
}

// Скачивание мема
function downloadMeme() {
    if (!memeImage.src) {
        alert('Сначала загрузи изображение!');
        return;
    }
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Устанавливаем размеры canvas в соответствии с оригинальным изображением
    canvas.width = memeImage.naturalWidth;
    canvas.height = memeImage.naturalHeight;
    
    // Рисуем черный фон (для рамки)
    if (currentStyle.frameEnabled) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Рассчитываем размеры изображения с рамкой
        const frameSize = Math.min(canvas.width, canvas.height) * currentStyle.frameSize / 100;
        const imgWidth = canvas.width - frameSize * 2;
        const imgHeight = canvas.height - frameSize * 2;
        
        // Рисуем изображение с рамкой
        ctx.drawImage(memeImage, frameSize, frameSize, imgWidth, imgHeight);
    } else {
        // Рисуем изображение без рамки
        ctx.drawImage(memeImage, 0, 0, canvas.width, canvas.height);
    }
    
    // Добавляем текст
    ctx.font = `${currentStyle.fontSize} ${currentStyle.fontFamily}`;
    ctx.fillStyle = currentStyle.textColor;
    ctx.strokeStyle = currentStyle.strokeColor;
    ctx.lineWidth = parseFloat(currentStyle.strokeWidth);
    ctx.textAlign = 'center';
    
    // Верхний текст
    const topText = topTextInput.value;
    if (topText) {
        const x = canvas.width / 2;
        const y = parseInt(currentStyle.fontSize) + 10;
        ctx.strokeText(topText, x, y);
        ctx.fillText(topText, x, y);
    }
    
    // Нижний текст
    const bottomText = bottomTextInput.value;
    if (bottomText) {
        const x = canvas.width / 2;
        const y = canvas.height - 10;
        ctx.strokeText(bottomText, x, y);
        ctx.fillText(bottomText, x, y);
    }
    
    // Создаем ссылку для скачивания
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'meme-' + Date.now() + '.png';
    link.click();
}

// Поделиться мемом
async function shareMeme() {
    if (!memeImage.src) {
        alert('Сначала создайте мем!');
        return;
    }
    
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Устанавливаем размеры canvas в соответствии с оригинальным изображением
        canvas.width = memeImage.naturalWidth;
        canvas.height = memeImage.naturalHeight;
        
        // Рисуем черный фон (для рамки)
        if (currentStyle.frameEnabled) {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Рассчитываем размеры изображения с рамкой
            const frameSize = Math.min(canvas.width, canvas.height) * currentStyle.frameSize / 100;
            const imgWidth = canvas.width - frameSize * 2;
            const imgHeight = canvas.height - frameSize * 2;
            
            // Рисуем изображение с рамкой
            ctx.drawImage(memeImage, frameSize, frameSize, imgWidth, imgHeight);
        } else {
            // Рисуем изображение без рамки
            ctx.drawImage(memeImage, 0, 0, canvas.width, canvas.height);
        }
        
        // Добавляем текст
        ctx.font = `${currentStyle.fontSize} ${currentStyle.fontFamily}`;
        ctx.fillStyle = currentStyle.textColor;
        ctx.strokeStyle = currentStyle.strokeColor;
        ctx.lineWidth = parseFloat(currentStyle.strokeWidth);
        ctx.textAlign = 'center';
        
        // Верхний текст
        const topText = topTextInput.value;
        if (topText) {
            const x = canvas.width / 2;
            const y = parseInt(currentStyle.fontSize) + 10;
            ctx.strokeText(topText, x, y);
            ctx.fillText(topText, x, y);
        }
        
        // Нижний текст
        const bottomText = bottomTextInput.value;
        if (bottomText) {
            const x = canvas.width / 2;
            const y = canvas.height - 10;
            ctx.strokeText(bottomText, x, y);
            ctx.fillText(bottomText, x, y);
        }
        
        // Конвертируем canvas в blob
        canvas.toBlob(async function(blob) {
            try {
                const formData = new FormData();
                formData.append('image', blob, 'meme.png');
                
                // Используем ImgBB API для загрузки изображения
                const apiKey = 'b16725851b31245c5927dda68e351446'; // Замените на ваш API ключ
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    const imageUrl = data.data.url;
                    await navigator.clipboard.writeText(imageUrl);
                    shareableUrl = imageUrl;
                    alert('Ссылка на мем скопирована в буфер обмена! Теперь вы можете вставить её в любой мессенджер.');
                } else {
                    throw new Error('Ошибка загрузки изображения');
                }
            } catch (err) {
                console.error('Ошибка при загрузке изображения:', err);
                alert('Не удалось поделиться мемом. Попробуйте скачать его и отправить вручную.');
            }
        }, 'image/png');
    } catch (error) {
        console.error('Ошибка при создании мема:', error);
        alert('Произошла ошибка. Попробуйте еще раз.');
    }
}

// Переключение рамки
frameToggle.addEventListener('change', function() {
    currentStyle.frameEnabled = this.checked;
    frameSizeControl.style.display = this.checked ? 'block' : 'none';
    updateFrame();
});

// Изменение размера рамки
frameSizeSlider.addEventListener('input', function() {
    currentStyle.frameSize = this.value;
    frameSizeValue.textContent = this.value + '%';
    updateFrame();
});

// Переключение формата изображения
formatToggle.addEventListener('change', function() {
    currentStyle.squareFormat = this.checked;
    updateImageFormat();
});

// Редактирование текста
topTextElement.addEventListener('input', function() {
    topTextInput.value = this.textContent;
});

bottomTextElement.addEventListener('input', function() {
    bottomTextInput.value = this.textContent;
});

// Слушатели изменений
topTextInput.addEventListener('input', updateMeme);
bottomTextInput.addEventListener('input', updateMeme);
fontFamilySelect.addEventListener('change', updateMeme);
fontSizeSlider.addEventListener('input', function() {
    fontSizeValue.textContent = this.value + 'px';
    updateMeme();
});
textColorInput.addEventListener('input', function() {
    colorHex.textContent = this.value.toUpperCase();
    updateMeme();
});
strokeColorInput.addEventListener('input', updateMeme);
strokeWidthSlider.addEventListener('input', function() {
    strokeWidthValue.textContent = parseFloat(this.value).toFixed(1) + 'px';
    updateMeme();
});

// Инициализация
loadRandomTemplates();
downloadBtn.disabled = true;
shareBtn.disabled = true;
updateMeme();
