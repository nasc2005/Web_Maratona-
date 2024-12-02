document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

document.addEventListener('DOMContentLoaded', () => {
    // Função para buscar e listar as maratonas
    let userId = localStorage.getItem("userId");
    const fetchMaratonas = () => {
        fetch(`http://localhost:8080/api/maratonas/criador/${userId}`)
            .then(response => response.json())
            .then(data => {
                const adminListBody = document.querySelector('#adminList tbody');
                adminListBody.innerHTML = ''; // Limpa a tabela antes de adicionar os novos dados
                data.forEach(maratona => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${maratona.id}</td>
                        <td>${maratona.nome}</td>
                        <td>${maratona.local}</td>
                        <td>${maratona.status}</td>
                        <td>${maratona.distancia} Km</td>
                        <td>${maratona.climaEsperado}</td>
                        <td>R$ ${maratona.valor}</td>
                        <td>
                            <!-- Botões de Atualizar e Excluir -->
                            <a href="maratona_atualizar.html?maratonaId=${maratona.id}">
                                <button class="delete">Alterar</button>
                            </a>
                            <button class="delete" data-id="${maratona.id}">Cancelar</button>
                        </td>
                    `;
                    adminListBody.appendChild(row);
                });

                // Adiciona o evento de exclusão aos botões "Excluir"
                document.querySelectorAll('.delete').forEach(button => {
                    button.addEventListener('click', function() {
                        const maratonaId = this.getAttribute('data-id');
                        deleteMaratona(maratonaId);
                    });
                });
            })
            .catch(error => {
                console.error('Erro ao buscar maratonas:', error);
            });
    };

    // Função de exclusão da maratona
    const deleteMaratona = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: "Tem certeza?",
            text: "A maratona será cancelada permanentemente",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim!",
            cancelButtonText: "Não!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8080/api/maratonas/${id}/cancelar`, {
                    method: 'PUT'
                })
                .then(response => {
                    if (response.ok) {
                        swalWithBootstrapButtons.fire({
                            title: "Cancelada!",
                            text: "Maratona cancelada com sucesso.",
                            icon: "success"
                        }).then(() => {
                            fetchMaratonas(); // Recarrega a lista após a exclusão
                        });
                    } else {
                        alert('Erro ao cancelar maratona');
                    }
                })
                .catch(error => {
                    console.error('Erro ao cancelar maratona:', error);
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: "Desistido",
                    text: "A maratona não foi cancelada.",
                    icon: "error"
                });
            }
        });
    };

    // Chama a função para listar as maratonas quando a página é carregada
    fetchMaratonas();
});
