// Efeito sutil no fundo com o movimento do mouse
document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth) * 15;
    const y = (e.clientY / window.innerHeight) * 15;
    document.body.style.backgroundPosition = `${x}px ${y}px`;
});

// --- SISTEMA DE CONTADOR GLOBAL DE DOWNLOADS ---
document.addEventListener('DOMContentLoaded', function() {
    // Definimos um nome único para o seu projeto no contador público
    const namespace = 'kcode-ide-davi';
    const key = 'downloads';

    const counterElements = document.querySelectorAll('#globalDownloadCount');

    // 1. Função para buscar o valor atual lá no servidor global
    function fetchGlobalCount() {
        fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/`)
            .then(response => {
                if (!response.ok) {
                    // Se for a primeira vez e o namespace não existir ainda, criamos ele
                    return createCounter();
                }
                return response.json();
            })
            .then(data => {
                if (data && typeof data.count === 'number') {
                    updateDisplay(data.count);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar contador global:', error);
            });
    }

    // Cria o contador na API caso seja a primeira execução
    function createCounter() {
        return fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
            .then(res => res.json())
            .then(data => {
                // Como o "up" já incrementou 1 na criação, subtraímos 1 ou apenas exibimos se preferir
                return { count: data.count || 1 };
            });
    }

    // 2. Atualiza o texto na tela de todas as páginas
    function updateDisplay(count) {
        counterElements.forEach(el => {
            el.textContent = count;
        });
    }

    // 3. Função chamada quando clica para baixar uma versão específica
    function incrementGlobalCount() {
        fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`)
            .then(response => response.json())
            .then(data => {
                if (data && typeof data.count === 'number') {
                    updateDisplay(data.count);
                }
            })
            .catch(error => {
                console.error('Erro ao atualizar contador global:', error);
            });
    }

    // Busca o valor atual assim que a página carrega
    fetchGlobalCount();

    // 4. Monitora cliques apenas nos cards de versões específicas
    const versionCards = document.querySelectorAll('.track-download');
    versionCards.forEach(card => {
        card.addEventListener('click', function() {
            incrementGlobalCount();
        });
    });
});