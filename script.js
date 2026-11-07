// Efeito sutil no fundo com o movimento do mouse
document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth) * 15;
    const y = (e.clientY / window.innerHeight) * 15;
    document.body.style.backgroundPosition = `${x}px ${y}px`;
});

// --- CONTADOR GLOBAL DE DOWNLOADS (NOVA API) ---
document.addEventListener('DOMContentLoaded', function() {
    // Identificador único para o seu projeto
    const namespace = 'kcode-ide-davi';
    const key = 'downloads';

    const counterElements = document.querySelectorAll('#globalDownloadCount');

    function updateDisplay(value) {
        counterElements.forEach(el => {
            el.textContent = value;
        });
    }

    // 1. Busca o valor atual na nova nuvem ao abrir a página
    fetch(`https://countapi.mileshilliard.com/get/${namespace}/${key}`)
        .then(response => response.json())
        .then(data => {
            if (data && typeof data.value === 'number') {
                updateDisplay(data.value);
            } else {
                updateDisplay(0);
            }
        })
        .catch(err => {
            console.log('Erro ao buscar contador:', err);
            updateDisplay(0);
        });

    // 2. Incrementa +1 globalmente apenas quando clica em baixar uma versão
    const versionCards = document.querySelectorAll('.track-download');
    versionCards.forEach(card => {
        card.addEventListener('click', function() {
            fetch(`https://countapi.mileshilliard.com/hit/${namespace}/${key}`)
                .then(response => response.json())
                .then(data => {
                    if (data && typeof data.value === 'number') {
                        updateDisplay(data.value);
                    }
                })
                .catch(err => {
                    console.log('Erro ao registrar download:', err);
                });
        });
    });
});