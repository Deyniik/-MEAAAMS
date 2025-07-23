document.addEventListener('DOMContentLoaded', function() {
    // Элементы управления
    const uploadInput = document.getElementById('upload');
    const uploadMain = document.getElementById('upload-main');
    const topTextInput = document.getElementById('text-top');
    const bottomTextInput = document.getElementById('text-bottom');
    const fontFamilySelect = document.getElementById('font-family');
    const fontSizeSlider = document.getElementById('font-size');
    const fontSizeValue = document.getElementById('font-size-value');
    const textColorInput = document.getElementById('text-color');
    const strokeColorInput = document.getElementById('stroke-color');
    const strokeWidthSlider = document.getElementById('stroke-width');
    const strokeWidthValue = document.getElementById('stroke-width-value');
    const memeImage = document.getElementById('meme-image');
    const topTextElement = document.getElementById('top-text');
    const bottomTextElement = document.getElementById('bottom-text');
    const memeContainer = document.getElementById('meme-container');
    const frameToggle = document.getElementById('frame-toggle');
    const frameSizeSlider = document.getElementById('frame-size');
    const frameSizeValue = document.getElementById('frame-size-value');
    const frameOverlay = document.getElementById('frame-overlay');
    const framedImage = document.getElementById('framed-image');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    const formatToggle = document.getElementById('format-toggle');

    let originalImageSrc = null;
    let currentStyle = {
        fontFamily: 'Impact',
        fontSize: '42px',
        textColor: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: '1px',
        frameEnabled: false,
        frameSize: 10,
        squareFormat: false
    };

    // Инициализация
    setupTextDragging();
    loadRandomTemplates();

    // Функции
    function setupTextDragging() {
        [topTextElement, bottomTextElement].forEach(text => {
            text.addEventListener('mousedown', startDrag);
        });

        function startDrag(e) {
            e.preventDefault();
            const text = e.target;
            let startX = e.clientX;
            let startY = e.clientY;
            let startLeft = parseInt(window.getComputedStyle(text).left);
            let startTop = parseInt(window.getComputedStyle(text).top);

            function moveText(e) {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                text.style.left = `${startLeft + dx}px`;
                text.style.top = `${startTop + dy}px`;
            }

            function stopDrag() {
                document.removeEventListener('mousemove', moveText);
                document.removeEventListener('mouseup', stopDrag);
            }

            document.addEventListener('mousemove', moveText);
            document.addEventListener('mouseup', stopDrag);
        }
    }

    function updateFrame() {
        if (currentStyle.frameEnabled && memeImage.src) {
            const frameSize = currentStyle.frameSize;
            const containerSize = Math.min(memeContainer.clientWidth, memeContainer.clientHeight);
            const framePx = (frameSize / 100) * containerSize;
            
            frameOverlay.style.display = 'block';
            framedImage.style.display = 'block';
            memeImage.style.display = 'none';
            
            framedImage.src = memeImage.src;
            framedImage.style.width = `calc(100% - ${framePx * 2}px)`;
            framedImage.style.height = `calc(100% - ${framePx * 2}px)`;
            framedImage.style.left = `${framePx}px`;
            framedImage.style.top = `${framePx}px`;
        } else {
            frameOverlay.style.display = 'none';
            framedImage.style.display = 'none';
            memeImage.style.display = 'block';
        }
    }

    function updateImageFormat() {
        if (currentStyle.squareFormat && memeImage.src) {
            memeContainer.style.aspectRatio = '1/1';
        } else {
            memeContainer.style.aspectRatio = '';
        }
    }

    // Остальные функции (handleFileUpload, applyFilter и т.д.)
    // ... (из предыдущего кода)

    // Слушатели событий
    frameToggle.addEventListener('change', function() {
        currentStyle.frameEnabled = this.checked;
        document.getElementById('frame-size-control').style.display = this.checked ? 'block' : 'none';
        updateFrame();
    });

    frameSizeSlider.addEventListener('input', function() {
        currentStyle.frameSize = this.value;
        frameSizeValue.textContent = this.value + '%';
        updateFrame();
    });

    formatToggle.addEventListener('change', function() {
        currentStyle.squareFormat = this.checked;
        updateImageFormat();
    });

    // Остальные слушатели событий
});
