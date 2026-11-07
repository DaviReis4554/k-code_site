// Efeito sutil no fundo com o movimento do mouse
document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth) * 15;
    const y = (e.clientY / window.innerHeight) * 15;
    document.body.style.backgroundPosition = `${x}px ${y}px`;
});

// --- CONTADOR GLOBAL DE DOWNLOADS REAL ---
document.addEventListener('DOMContentLoaded', function() {
    // Namespace e chave únicos para o seu projeto no servidor global
    const namespace = 'kcode_ide_davi_downloads';
    const key = 'total';

    const counterElements = document.querySelectorAll('#globalDownloadCount');

    // Função para atualizar o número em todas as telas da página
    function updateDisplay(value) {
        counterElements.forEach(el => {
            el.textContent = value;
        });
    }

    // 1. Ao carregar a página, apenas BUSCA o valor atual do servidor (sem somar nada sozinho)
    fetch(`https://api.countapi.xyz/get/${namespace}/${key}`)
        .then(response => response.json())
        .then(data => {
            if (data && typeof data.value === 'number') {
                updateDisplay(data.value);
            } else {
                // Se o contador ainda não existir no servidor, cria ele com 0
                return fetch(`https://api.countapi.xyz/create?namespace=${namespace}&key=${key}&value=0`)
                    .then(res => res.json())
                    .then(createData => {
                        updateDisplay(createData.value || 0);
                    });
            }
        })
        .catch(err => {
            console.log('Erro ao carregar contador:', err);
        });

    // 2. SÓ SOMA +1 quando o usuário clicar de fato em um botão/card de versão para baixar
    const versionCards = document.querySelectorAll('.track-download');
    versionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Faz a requisição de hit (incrementar +1) no servidor global
            fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
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