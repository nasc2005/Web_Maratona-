document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

document.addEventListener('DOMContentLoaded', function() {
    // Função para enviar os dados do formulário ao backend
    document.getElementById('add-toy-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio tradicional do formulário

        // Coleta os valores dos campos do formulário
        const criador = localStorage.getItem('userId'); // Recupera o ID do usuário do localStorage
        const nome = document.getElementById('nome').value;
        const local = document.getElementById('local').value;
        const dataInicio = document.getElementById('dataInicio').value;
        const dataFinal = document.getElementById('dataFinal').value;
        const distancia = document.getElementById('distancia').value;
        const descricao = document.getElementById('descricao').value;
        const regras = document.getElementById('regras').value;
        const limiteParticipantes = document.getElementById('limiteParticipantes').value;
        const valor = document.getElementById('valor').value;
        const climaEsperado = document.getElementById('climaEsperado').value;
        const tipoTerreno = document.getElementById('tipoTerreno').value;

        // Envia os dados para o backend via POST
        fetch('http://localhost:8080/api/maratonas', {
            method: 'POST', // Método POST para enviar os dados
            headers: {
                'Content-Type': 'application/json', // Envia os dados como JSON
            },
            body: JSON.stringify({
                criador, 
                nome, 
                local, 
                dataInicio, 
                dataFinal, 
                distancia, 
                descricao, 
                regras, 
                limiteParticipantes, 
                valor, 
                climaEsperado, 
                tipoTerreno
            })            
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao adicionar maratona');
            }
            return response.json(); // Retorna os dados da maratona criada
        })
        .then(data => {
            // Exibe mensagem de sucesso
            Swal.fire(
                'Sucesso!',
                'Maratona adicionada com sucesso!',
                'success'
            );

            // Limpa o formulário após o envio bem-sucedido
            document.getElementById('add-toy-form').reset();
        })
        .catch(error => {
            console.error('Erro ao adicionar maratona:', error);
            // Exibe mensagem de erro
            Swal.fire(
                'Erro',
                'Não foi possível adicionar a maratona. Tente novamente.',
                'error'
            );
        });
    });
});
