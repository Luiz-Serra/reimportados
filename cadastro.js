document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const authBtn = document.querySelector('.auth-btn');

    // Sincronizar Modo Escuro
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const pass = document.getElementById('pass-reg').value;
        const confirmPass = document.getElementById('pass-confirm').value;

        // Validação de Senhas Iguais
        if (pass !== confirmPass) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return;
        }

        // Efeito de Carregamento
        authBtn.innerHTML = 'Criando Conta...';
        authBtn.disabled = true;

        setTimeout(() => {
            alert('Conta criada com sucesso! Agora você pode fazer login.');
            window.location.href = 'login.html';
        }, 2000);
    });
});