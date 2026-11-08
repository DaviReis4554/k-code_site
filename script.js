// Efeito sutil no fundo com o movimento do mouse
document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth) * 15;
    const y = (e.clientY / window.innerHeight) * 15;
    document.body.style.backgroundPosition = `${x}px ${y}px`;
});

// Se estiver na página de download, simula o início do download automático se necessário
const directDownloadBtn = document.getElementById('directDownloadBtn');
if (directDownloadBtn) {
    directDownloadBtn.addEventListener('click', function(e) {
        alert('O download do instalador foi iniciado!');
    });
}

// --- SISTEMA DE CONTADOR GLOBAL DE DOWNLOADS (via API) ---
document.addEventListener('DOMContentLoaded', function() {
    const versionCards = document.querySelectorAll('.version-card');

    if (versionCards.length > 0) {
        // Namespace único para o seu projeto (substitua 'kcode' se quiser)
        const namespace = 'kcode_ide_downloads';

        // 1. Buscar os valores atuais do servidor ao carregar a página
        versionCards.forEach(card => {
            const versionKey = card.getAttribute('data-version'); // ex: v1_0, vbeta, valpha
            const countElement = document.getElementById(`count-${versionKey}`);
            
            if (countElement) {
                // Faz uma requisição GET para pegar o valor atual na nuvem
                fetch(`https://api.countapi.xyz/get/${namespace}/${versionKey}`)
                    .then(response => response.json())
                    .then(data => {
                        countElement.textContent = data.value !== undefined ? data.value : 0;
                    })
                    .catch(error => {
                        console.error('Erro ao buscar contador:', error);
                        countElement.textContent = '-';
                    });
            }
        });

        // 2. Adicionar o evento de clique para incrementar +1 no servidor
        versionCards.forEach(card => {
            card.addEventListener('click', function() {
                const versionKey = this.getAttribute('data-version');
                const countElement = document.getElementById(`count-${versionKey}`);

                // Faz uma requisição HIT para somar +1 no servidor
                fetch(`https://api.countapi.xyz/hit/${namespace}/${versionKey}`)
                    .then(response => response.json())
                    .then(data => {
                        if (countElement && data.value !== undefined) {
                            countElement.textContent = data.value;
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao atualizar contador:', error);
                    });
            });
        });
    }
});