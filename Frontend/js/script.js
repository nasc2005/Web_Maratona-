document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validação do login
    if (email === 'admin@admin' && password === 'admin') {
        // Se a validação for bem-sucedida, redireciona para admin.html
        Swal.fire({
            icon: 'success',
            title: 'Login bem-sucedido',
            text: 'Redirecionando para a página de administração...',
            timer: 2000,
            timerProgressBar: true,
            didClose: () => {
                window.location.href = 'admin.html';
            }
        });
    } else {
        // Exibe uma mensagem de erro se as credenciais forem inválidas
        Swal.fire({
            icon: 'error',
            title: 'Erro de login',
            text: 'Email ou senha incorretos. Tente novamente.',
            confirmButtonText: 'OK'
        });
    }
});

// Função para adicionar uma nova categoria
document.getElementById('add-category-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    const response = await fetch('/api/categories', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        event.target.reset();
        alert('Categoria adicionada com sucesso!');
    } else {
        alert('Erro ao adicionar categoria');
    }
});
