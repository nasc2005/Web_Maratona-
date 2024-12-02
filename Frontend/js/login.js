document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    const loginRequest = () => {
        fetch(`http://localhost:8080/api/empresas/login`, {
            method: 'POST', // Usando o método POST
            headers: {
                'Content-Type': 'application/json', // Envia os dados como JSON
            },
            body: JSON.stringify({ email, senha }) // Passando email e senha no corpo da requisição
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na resposta da rede: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log para verificar os dados recebidos

            // Verifica se o retorno da API é -1 (erro) ou um ID válido
            if (data === -1) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro de Login',
                    text: 'Email ou senha incorretos',
                });
            } else {
                // Aqui o 'data' deve ser o ID do usuário
                localStorage.setItem('userId', data); // Salva o ID no localStorage

                            Swal.fire({
                                icon: 'success',
                                title: 'Login bem-sucedido',
                                text: 'Redirecionando para a página de administração...',
                                timer: 2000,
                                timerProgressBar: true,
                                didClose: () => {
                                    window.location.href = 'alterar.html';
                                }
                            });

            }
        })
        .catch(error => {
            console.error('Erro na requisição de login:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro ao tentar fazer login',
                text: `Detalhes do erro: ${error.message}`,
            });
        });
    };

    loginRequest();
});
