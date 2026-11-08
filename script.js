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

// --- IMPORTANDO O FIREBASE VIA CDN (MODULAR) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// SUAS CREDENCIAIS DO FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyAN7q4F8ZD3qrERaFwFcyj_Jq9AqG8mJZ8",
    authDomain: "k-code-downloads.firebaseapp.com",
    projectId: "k-code-downloads",
    storageBucket: "k-code-downloads.appfirebasestorage.app",
    messagingSenderId: "297742792549",
    appId: "1:297742792549:web:43a77682578515a25cd38c",
    measurementId: "G-V1THYHW85J"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- SISTEMA DE CONTADOR GLOBAL COM FIREBASE ---
document.addEventListener('DOMContentLoaded', async function() {
    const versionCards = document.querySelectorAll('.version-card');

    if (versionCards.length > 0) {
        const statsRef = doc(db, "stats", "downloads");

        // 1. Ao carregar a página, busca os valores do Firebase
        try {
            const docSnap = await getDoc(statsRef);
            
            if (docSnap.exists()) {
                const data = docSnap.data();
                versionCards.forEach(card => {
                    const versionKey = card.getAttribute('data-version');
                    const countElement = document.getElementById(`count-${versionKey}`);
                    if (countElement) {
                        countElement.textContent = data[versionKey] !== undefined ? data[versionKey] : 0;
                    }
                });
            } else {
                // Se o documento ainda não existe no banco, cria ele zerado
                await setDoc(statsRef, { v1_0: 0, vbeta: 0, valpha: 0 });
                versionCards.forEach(card => {
                    const countElement = document.getElementById(`count-${card.getAttribute('data-version')}`);
                    if (countElement) countElement.textContent = 0;
                });
            }
        } catch (error) {
            console.error("Erro ao carregar downloads do Firebase:", error);
            versionCards.forEach(card => {
                const countElement = document.getElementById(`count-${card.getAttribute('data-version')}`);
                if (countElement) countElement.textContent = "0";
            });
        }

        // 2. Adiciona o evento de clique para somar +1 em tempo real no Firebase
        versionCards.forEach(card => {
            card.addEventListener('click', async function() {
                const versionKey = this.getAttribute('data-version');
                const countElement = document.getElementById(`count-${versionKey}`);

                try {
                    await updateDoc(statsRef, {
                        [versionKey]: increment(1)
                    });

                    if (countElement) {
                        let atual = parseInt(countElement.textContent) || 0;
                        countElement.textContent = atual + 1;
                    }
                } catch (error) {
                    console.error("Erro ao atualizar o download no Firebase:", error);
                }
            });
        });
    }
});