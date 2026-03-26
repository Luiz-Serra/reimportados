document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const authBtn = document.querySelector('.auth-btn');

    // 1. Verificar e aplicar Modo Escuro salvo no navegador
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // 2. Lógica de Submissão do Formulário
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validação simples de preenchimento
        if (email && password) {
            // Efeito visual de carregamento no botão (UX Premium)
            authBtn.innerHTML = 'Acessando...';
            authBtn.style.opacity = '0.7';
            authBtn.disabled = true;

            // Simulação de login (aqui você conectaria com um banco de dados no futuro)
            setTimeout(() => {
                console.log('Login solicitado para:', email);
                
                // Exemplo: Redirecionar para a home após sucesso
                alert('Bem-vindo à Re Importados!');
                window.location.href = 'index.html'; 
            }, 1500);
        }
    });

    // 3. Recuperação de Senha (Simulação)
    const forgotPwLink = document.querySelector('.forgot-password');
    forgotPwLink.addEventListener('click', (e) => {
        e.preventDefault();
        const userEmail = document.getElementById('email').value;
        
        if (!userEmail) {
            alert('Por favor, digite seu e-mail no campo acima para recuperar a senha.');
        } else {
            alert(`Um link de recuperação foi enviado para: ${userEmail}`);
        }
    });
});