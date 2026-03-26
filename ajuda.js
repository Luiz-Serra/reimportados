// 1. Alternar entre abas de ajuda
function showContent(tab) {
    // Aqui você pode expandir para mudar o texto do card dinamicamente
    const cardTitle = document.querySelector('.card-column h3');
    const btns = document.querySelectorAll('.tab-btn');
    
    btns.forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');

    if(tab === 'pagamentos') {
        cardTitle.innerHTML = "💳 Pagamentos";
        // Você pode mudar o resto do texto aqui via innerHTML
    } else {
        cardTitle.innerHTML = "🛒 Compras";
    }
}

// 2. Simular Envio de Feedback
function sendFeedback() {
    const text = document.getElementById('feedbackText').value;
    if(text.trim() === "") {
        alert("Por favor, digite uma mensagem antes de enviar.");
        return;
    }
    
    // Animação de envio
    const btn = document.querySelector('.send-btn');
    btn.innerHTML = "Enviando...";
    btn.disabled = true;

    setTimeout(() => {
        alert("Obrigado! Sua mensagem foi enviada com sucesso.");
        document.getElementById('feedbackText').value = "";
        btn.innerHTML = "Enviar Mensagem";
        btn.disabled = false;
    }, 1500);
}

// 3. Aplicar Modo Escuro se estiver ativo na principal
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

<a href="javascript:history.back()" class="back-arrow">←</a>