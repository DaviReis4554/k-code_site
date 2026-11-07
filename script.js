// Efeito sutil no fundo com o movimento do mouse
document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth) * 15;
    const y = (e.clientY / window.innerHeight) * 15;
    document.body.style.backgroundPosition = `${x}px ${y}px`;
});

// --- SISTEMA DE CONTADOR DE DOWNLOADS ---
document.addEventListener('DOMContentLoaded', function() {
    const STORAGE_KEY = 'kcode_download_count';

    // 1. Pega o valor atual do armazenamento local (ou inicia com 0)
    let currentCount = localStorage.getItem(STORAGE_KEY);
    if (currentCount === null) {
        currentCount = 0;
        localStorage.setItem(STORAGE_KEY, currentCount);
    } else {
        currentCount = parseInt(currentCount, 10);
    }

    // 2. Atualiza todos os elementos visuais do contador na página atual
    function updateCounterDisplay() {
        const counterElements = document.querySelectorAll('#globalDownloadCount');
        counterElements.forEach(el => {
            el.textContent = currentCount;
        });
    }

    updateCounterDisplay();

    // 3. Monitora cliques apenas nos cards de versões específicas para somar no contador
    const versionCards = document.querySelectorAll('.track-download');
    versionCards.forEach(card => {
        card.addEventListener('click', function() {
            currentCount++;
            localStorage.setItem(STORAGE_KEY, currentCount);
            updateCounterDisplay();
        });
    });
});