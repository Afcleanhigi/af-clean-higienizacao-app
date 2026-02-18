/**
 * AF CLEAN - APLICATIVO DE GESTÃO
 * Sistema completo para higienização de estofados
 */

// ==========================================
// VARIÁVEIS GLOBAIS
// ==========================================
let clients = JSON.parse(localStorage.getItem('afclean_clients')) || [];
let currentClientId = null;
let currentPhotos = { before: [], after: [] };
let selectedPayment = null;
let signaturePad = null;

// ==========================================
// INICIALIZAÇÃO
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    createBubbles();
    updateDashboard();
    renderClients();
    initSignaturePad();
    setupEventListeners();
    
    // Definir data mínima como hoje
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('serviceDate');
    if (dateInput) {
        dateInput.value = today;
        dateInput.min = today;
    }
    
    // Verificar lembretes ao iniciar
    checkReminders();
    
    console.log('✅ AF Clean App iniciado com sucesso!');
}

function setupEventListeners() {
    // Formulário de agendamento
    const form = document.getElementById('agendamentoForm');
    if (form) {
        form.addEventListener('submit', handleAgendamentoSubmit);
    }
    
    // Fechar modais com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Prevenir fechamento acidental com dados não salvos
    window.addEventListener('beforeunload', (e) => {
        if (currentClientId && (currentPhotos.before.length > 0 || currentPhotos.after.length > 0)) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
}

// ==========================================
// ANIMAÇÕES VISUAIS
// ==========================================
function createBubbles() {
    const container = document.getElementById('bubbles');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < 12; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 100 + '%';
        const size = Math.random() * 50 + 30;
        bubble.style.width = bubble.style.height =
                                              
