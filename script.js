// Efeito sutil no fundo com o movimento do mouse
document.addEventListener('mousemove', function(e) {
    const x = (e.clientX / window.innerWidth) * 15;
    const y = (e.clientY / window.innerHeight) * 15;
    document.body.style.backgroundPosition = `${x}px ${y}px`;
});

// Se estiver na página de download, simula o início do download automático
const directDownloadBtn = document.getElementById('directDownloadBtn');
if (directDownloadBtn) {
    directDownloadBtn.addEventListener('click', function(e) {
        // Se quiser testar ou disparar o link real do instalador no futuro, basta apontar aqui
        alert('O download do instalador foi iniciado!');
    });
}