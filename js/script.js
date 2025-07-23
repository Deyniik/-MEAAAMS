// Инициализация элементов
const memeImage = document.getElementById('meme-image');
const uploadPlaceholder = document.getElementById('upload-placeholder');
const memeContainer = document.getElementById('meme-container');
const topTextElement = document.getElementById('top-text');
const bottomTextElement = document.getElementById('bottom-text');
const centerText = document.getElementById('center-text');
const frameToggle = document.getElementById('frame-toggle');
const frameSizeSlider = document.getElementById('frame-size');
const frameSizeValue = document.getElementById('frame-size-value');
const formatToggle = document.getElementById('format-toggle');
const effectButtons = document.querySelectorAll('.effect-btn');
const filterPanel = document.getElementById('filters-panel');
const imageEffectsPanel = document.getElementById('image-effects-panel');
const effectsPanel = document.querySelectorAll('.panel');
const effectBtnReset = Array.from(document.querySelectorAll('.effect-btn')).find(btn => btn.innerHTML.includes('Сбросить'));

// Стейт
let currentStyle = {
  filter: 'none',
  frameEnabled: false,
  squareFormat: false,
  frameSize: 10
};

// Загрузка файла
document.getElementById('upload').addEventListener('change', e => {
  handleFile(e.target.files[0]);
});
document.getElementById('upload-main').addEventListener('change', e => {
  handleFile(e.target.files[0]);
});

// Обработка вставки из буфера
document.addEventListener('paste', e => {
  if (e.clipboardData.files.length > 0) {
    handleFile(e.clipboardData.files[0]);
  }
});

// Основная функция загрузки
function handleFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    memeImage.src = reader.result;
    memeImage.style.display = 'block';
    uploadPlaceholder.style.display = 'none';
    // Обновляем масштаб
    memeImage.onload = () => {
      updateImageSize();
    };
  };
  reader.readAsDataURL(file);
}

// Включение/выключение изображения по тумблеру
document.getElementById('frame-toggle').addEventListener('change', e => {
  currentStyle.frameEnabled = e.target.checked;
  updateFrame();
});
document.getElementById('format-toggle').addEventListener('change', e => {
  currentStyle.squareFormat = e.target.checked;
  updateImageSize();
});

// Функция обновления размера изображения
function updateImageSize() {
  if (!memeImage.src) {
    showPlaceholder();
    return;
  }
  if (currentStyle.squareFormat) {
    // Масштабируем в квадрат
    memeImage.style.objectFit = 'cover';
    memeImage.style.width = '100%';
    memeImage.style.height = 'auto';
  } else {
    // По соотношению
    memeImage.style.objectFit = 'contain';
  }
  // Центрируем
  memeImage.style.margin = '0 auto';
}

// Показать placeholder
function showPlaceholder() {
  document.getElementById('upload-placeholder').style.display = 'flex';
  memeImage.style.display = 'none';
}

// Обработка тумблера рамки
function updateFrame() {
  const overlay = document.getElementById('frame-overlay');
  const framedImg = document.getElementById('framed-image');
  if (currentStyle.frameEnabled && memeImage.src) {
    overlay.style.display = 'block';
    framedImg.style.display = 'block';
    memeImage.style.display = 'none';

    // Расчет рамки
    const containerSize = Math.min(memeContainer.clientWidth, memeContainer.clientHeight);
    const frameSizePx = containerSize * currentStyle.frameSize / 100;

    framedImg.src = memeImage.src;
    framedImg.style.width = `calc(100% - ${2 * frameSizePx}px)`;
    framedImg.style.height = `calc(100% - ${2 * frameSizePx}px)`;
    framedImg.style.position = 'absolute';
    framedImg.style.top = `${frameSizePx}px`;
    framedImg.style.left = `${frameSizePx}px`;
    framedImg.style.objectFit = 'contain';

    overlay.style.width = '100%';
    overlay.style.height = '100%';
  } else {
    document.getElementById('frame-overlay').style.display = 'none';
    document.getElementById('framed-image').style.display = 'none';
    if (memeImage.src) {
      memeImage.style.display = 'block';
    }
  }
}

// Обработка "Квадратного формата"
function updateImageSize() {
  if (!memeImage.src) {
    showPlaceholder();
    return;
  }
  if (currentStyle.squareFormat) {
    // Масштабировать в квадрат
    memeImage.style.objectFit = 'cover';
    memeImage.style.width = '100%';
    memeImage.style.height = 'auto';
  } else {
    // По соотношению
    memeImage.style.objectFit = 'contain';
    memeImage.style.width = '100%';
    memeImage.style.height = 'auto';
  }
  // Центрирование
  memeImage.style.margin = '0 auto';
}

// Обработчики кнопок эффектов
function applyFilter(filter) {
  currentStyle.filter = filter;
  if (currentStyle.frameEnabled) {
    document.getElementById('framed-image').style.filter = filter;
  } else {
    memeImage.style.filter = filter;
  }
}

// Кнопка "Сбросить эффекты"
effectBtnReset.onclick = () => {
  currentStyle.filter = 'none';
  if (currentStyle.frameEnabled) {
    document.getElementById('framed-image').style.filter = 'none';
  } else {
    memeImage.style.filter = 'none';
  }
};

// Обработка "Черной рамки"
document.getElementById('frame-toggle').addEventListener('change', e => {
  currentStyle.frameEnabled = e.target.checked;
  updateFrame();
});

// Обработка "Квадратного формата"
document.getElementById('format-toggle').addEventListener('change', e => {
  currentStyle.squareFormat = e.target.checked;
  updateImageSize();
});

// Обработка слайдера рамки
document.getElementById('frame-size').addEventListener('input', e => {
  currentStyle.frameSize = e.target.value;
  document.getElementById('frame-size-value').textContent = e.target.value + '%';
  updateFrame();
});

// Обновление текста
function updateMeme() {
  topTextElement.textContent = document.getElementById('text-top').value;
  bottomTextElement.textContent = document.getElementById('text-bottom').value;

  // Обновление стилей текста
  topTextElement.style.fontFamily = document.getElementById('font-family').value;
  bottomTextElement.style.fontFamily = document.getElementById('font-family').value;
  topTextElement.style.fontSize = document.getElementById('font-size').value + 'px';
  bottomTextElement.style.fontSize = document.getElementById('font-size').value + 'px';
  topTextElement.style.color = document.getElementById('text-color').value;
  bottomTextElement.style.color = document.getElementById('text-color').value;
  topTextElement.style.webkitTextStroke = `${document.getElementById('stroke-width').value}px ${document.getElementById('stroke-color').value}`;
  bottomTextElement.style.webkitTextStroke = `${document.getElementById('stroke-width').value}px ${document.getElementById('stroke-color').value}`;

  // Обновляем эффект текста
  applyTextEffect(currentStyle.textEffect);
  // Обновляем фильтр
  if (currentStyle.frameEnabled) {
    document.getElementById('framed-image').style.filter = currentStyle.filter;
  } else {
    memeImage.style.filter = currentStyle.filter;
  }
}

// Текстовые эффекты
function applyTextEffect(effect) {
  currentStyle.textEffect = effect;
  // сброс эффектов
  topTextElement.style.background = '';
  topTextElement.style.webkitBackgroundClip = '';
  topTextElement.style.webkitTextFillColor = '';
  topTextElement.style.textShadow = '';
  topTextElement.style.animation = '';
  bottomTextElement.style.background = '';
  bottomTextElement.style.webkitBackgroundClip = '';
  bottomTextElement.style.webkitTextFillColor = '';
  bottomTextElement.style.textShadow = '';
  bottomTextElement.style.animation = '';

  switch (effect) {
    case 'gradient':
      const gradient = `linear-gradient(to right, ${document.getElementById('text-color').value}, ${getRandomColor()})`;
      topTextElement.style.background = gradient;
      topTextElement.style.webkitBackgroundClip = 'text';
      topTextElement.style.webkitTextFillColor = 'transparent';
      bottomTextElement.style.background = gradient;
      bottomTextElement.style.webkitBackgroundClip = 'text';
      bottomTextElement.style.webkitTextFillColor = 'transparent';
      break;
    case 'neon':
      const neonColor = document.getElementById('text-color').value;
      const neonShadow = `0 0 5px ${neonColor}, 0 0 10px ${neonColor}, 0 0 20px ${neonColor}`;
      topTextElement.style.textShadow = neonShadow;
      bottomTextElement.style.textShadow = neonShadow;
      break;
    case 'outline':
      topTextElement.style.webkitTextStroke = `2px ${document.getElementById('text-color').value}`;
      topTextElement.style.webkitTextFillColor = 'transparent';
      bottomTextElement.style.webkitTextStroke = `2px ${document.getElementById('text-color').value}`;
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
      const ts = [];
      for (let i = 1; i <= 5; i++) {
        ts.push(`${i}px ${i}px 0 ${getRandomColor()}`);
      }
      topTextElement.style.textShadow = ts.join(', ');
      bottomTextElement.style.textShadow = ts.join(', ');
      break;
    case 'none':
      // ничего не делаем
      break;
  }
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

// Инициализация
// Обработки событий
document.getElementById('font-family').addEventListener('change', updateMeme);
document.getElementById('font-size').addEventListener('input', () => {
  document.getElementById('font-size-value').innerText = document.getElementById('font-size').value + 'px';
  updateMeme();
});
document.getElementById('text-top').addEventListener('input', () => {
  updateMeme();
});
document.getElementById('text-bottom').addEventListener('input', () => {
  updateMeme();
});
document.getElementById('text-color').addEventListener('input', () => {
  document.getElementById('color-hex').innerText = document.getElementById('text-color').value.toUpperCase();
  updateMeme();
});
document.getElementById('stroke-color').addEventListener('input', () => {
  updateMeme();
});
document.getElementById('stroke-width').addEventListener('input', () => {
  document.getElementById('stroke-width-value').innerText = document.getElementById('stroke-width').value + 'px';
  updateMeme();
});

// Эффекты текста
// Вызовите при необходимости или добавьте интерфейс выбора

// По кнопкам эффектов
// Пример: document.querySelectorAll('.effect-btn').forEach(btn => btn.addEventListener('click', () => applyTextEffect(effectName)));

// Изначально можно установить эффект "none"
applyTextEffect('none');

// Обработка "Очистить эффекты" (кнопка "Сбросить")
effectBtnReset.onclick = () => {
  applyTextEffect('none');
  currentStyle.filter = 'none';
  if (currentStyle.frameEnabled) {
    document.getElementById('framed-image').style.filter = 'none';
  } else {
    memeImage.style.filter = 'none';
  }
};

// Вызовите loadRandomTemplates() при старте
loadRandomTemplates();
updateMeme();
