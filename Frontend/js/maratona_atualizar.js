document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const maratonaId = urlParams.get('maratonaId'); // Obtém o ID da maratona da URL

    // Carrega os dados da maratona para edição
    if (maratonaId) {
        fetch(`http://localhost:8080/api/maratonas/${maratonaId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar dados da maratona');
                }
                return response.json();
            })
            .then(maratona => {
                console.log(maratona);
                // Preenche o formulário com os dados da maratona
                document.getElementById('titleAtu').innerText = `Atualizar Maratona, criado por ${maratona.nomeEmpresa}`;
                document.getElementById('nome').value = maratona.maratona.nome;
                document.getElementById('local').value = maratona.maratona.local;
                document.getElementById('dataInicio').value = maratona.maratona.dataInicio;
                document.getElementById('dataFinal').value = maratona.maratona.dataFinal;
                document.getElementById('status').value = maratona.maratona.status;
                document.getElementById('distancia').value = maratona.maratona.distancia;
                document.getElementById('descricao').value = maratona.maratona.descricao;
                document.getElementById('regras').value = maratona.maratona.regras;
                document.getElementById('limiteParticipantes').value = maratona.maratona.limiteParticipantes;
                document.getElementById('valor').value = maratona.maratona.valor;
                document.getElementById('climaEsperado').value = maratona.maratona.climaEsperado;
                document.getElementById('tipoTerreno').value = maratona.maratona.tipoTerreno;
            })
            .catch(error => {
                console.error('Erro ao carregar maratona:', error);
                Swal.fire('Erro', 'Não foi possível carregar os dados da maratona.', 'error');
            });
    }

    // Configura o evento de envio do formulário
    document.getElementById('update-marathon-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Captura os valores do formulário
        const nome = document.getElementById('nome').value;
        const local = document.getElementById('local').value;
        const dataInicio = document.getElementById('dataInicio').value;
        const dataFinal = document.getElementById('dataFinal').value;
        const status = document.getElementById('status').value;
        const distancia = document.getElementById('distancia').value;
        const descricao = document.getElementById('descricao').value;
        const regras = document.getElementById('regras').value;
        const limiteParticipantes = document.getElementById('limiteParticipantes').value;
        const valor = document.getElementById('valor').value;
        const climaEsperado = document.getElementById('climaEsperado').value;
        const tipoTerreno = document.getElementById('tipoTerreno').value;

        // Envia os dados para o backend
        fetch(`http://localhost:8080/api/maratonas/${maratonaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome,
                local,
                dataInicio,
                dataFinal,
                status,
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
            if (response.ok) {
                Swal.fire('Atualizado!', 'A maratona foi atualizada com sucesso.', 'success')
                    .then(() => window.location.href = 'alterar.html');
            } else {
                throw new Error('Erro ao atualizar maratona');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            Swal.fire('Erro', 'Não foi possível atualizar a maratona.', 'error');
        });
    });
});
