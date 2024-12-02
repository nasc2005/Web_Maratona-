document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const cnpj = document.getElementById('cnpj').value;
    const local = document.getElementById('local').value;

    // Requisição para a API
    fetch('http://localhost:8080/api/empresas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome,
            email,
            telefone,
            usuario,
            senha,
            cnpj,
            local
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na resposta: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Empresa cadastrada:', data);

        Swal.fire({
            icon: 'success',
            title: 'Cadastro realizado!',
            text: 'Você será redirecionado para a página de login.',
            timer: 2000,
            timerProgressBar: true,
            didClose: () => {
                window.location.href = 'index.html';
            }
        });
    })
    .catch(error => {
        console.error('Erro no cadastro:', error);
        Swal.fire({
            icon: 'error',
            title: 'Erro no cadastro',
            text: `Detalhes: ${error.message}`,
        });
    });
});
