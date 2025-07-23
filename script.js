// Элементы управления
const uploadInput = document.getElementById('upload');
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
const memeMask = document.getElementById('meme-mask');
const frameToggle = document.getElementById('frame-toggle');
const frameSizeSlider = document.getElementById('frame-size');
const frameSizeValue = document.getElementById('frame-size-value');
const frameOverlay = document.getElementById('frame-overlay');
const framedImage = document.getElementById('framed-image');
const frameSizeControl = document.getElementById('frame-size-control');
const topTextBackground = document.getElementById('top-text-background');
const bottomTextBackground = document.getElementById('bottom-text-background');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const uploadBtn = document.getElementById('upload-btn');

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
    textPosition: 'both'
};

// Шутки для мемов (30 вариантов без "Когда")
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
    ["Все идет по плану", "Но плана нет"]
];

// Загрузка случайных шаблонов
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

// Переключение панелей
function togglePanel(panelId) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        if (panel.id !== panelId) {
            panel.style.display = 'none';
        }
    });
    
    const panel = document.getElementById(panelId);
    panel.style.display = panel.style.display === 'grid' ? 'none' : 'grid';
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

// Винтажный фильтр (комбинация эффектов)
function applyVintageFilter() {
    currentStyle.filter = 'sepia(70%) brightness(80%) contrast(120%) saturate(80%)';
    memeImage.style.filter = currentStyle.filter;
    framedImage.style.filter = currentStyle.filter;
}

// Пиксельный эффект
function applyPixelFilter() {
    currentStyle.filter = 'contrast(2) brightness(1.2)';
    memeImage.style.filter = currentStyle.filter;
    framedImage.style.filter = currentStyle.filter;
    
    // Создаем эффект пикселизации через canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = memeImage.naturalWidth;
    canvas.height = memeImage.naturalHeight;
    
    // Уменьшаем и увеличиваем изображение для эффекта пикселизации
    const size = Math.min(canvas.width, canvas.height) * 0.1;
    ctx.drawImage(memeImage, 0, 0, size, size);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(canvas, 0, 0, size, size, 0, 0, canvas.width, canvas.height);
    
    memeImage.src = canvas.toDataURL();
    framedImage.src = canvas.toDataURL();
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
            
            // Создаем центральный текст, если его нет
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

// Обновление мема в реальном времени
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

// Загрузка изображения
uploadInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            memeImage.src = event.target.result;
            memeImage.style.display = 'block';
            uploadPlaceholder.style.display = 'none';
            
            memeImage.onload = function() {
                imageAspectRatio = this.naturalWidth / this.naturalHeight;
                updateFrame();
            };
        };
        reader.readAsDataURL(file);
    }
});

// Кнопка загрузки в центре
uploadBtn.addEventListener('click', function() {
    uploadInput.click();
});

// Использование шаблона
function useTemplate(img) {
    memeImage.src = img.src;
    memeImage.style.display = 'block';
    uploadPlaceholder.style.display = 'none';
    
    memeImage.onload = function() {
        imageAspectRatio = this.naturalWidth / this.naturalHeight;
        updateFrame();
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
    
    html2canvas(memeContainer).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'deymem-pro-' + Date.now() + '.png';
        link.click();
    });
}

// Поделиться мемом
async function shareMeme() {
    if (!memeImage.src) {
        alert('Сначала создайте мем!');
        return;
    }
    
    try {
        const canvas = await html2canvas(memeContainer);
        canvas.toBlob(async function(blob) {
            try {
                const formData = new FormData();
                formData.append('image', blob, 'meme.png');
                
                const apiKey = 'b16725851b31245c5927dda68e351446';
                const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    const imageUrl = data.data.url;
                    await navigator.clipboard.writeText(imageUrl);
                    shareableUrl = imageUrl;
                    alert('Ссылка на мем скопирована в буфер обмена!');
                } else {
                    throw new Error('Ошибка загрузки изображения');
                }
            } catch (err) {
                console.error('Ошибка при загрузке изображения:', err);
                fallbackShare(canvas);
            }
        }, 'image/png');
    } catch (error) {
        console.error('Ошибка при создании мема:', error);
        fallbackShare();
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
updateMeme();
