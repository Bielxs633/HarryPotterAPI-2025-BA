document.addEventListener('DOMContentLoaded', () => {
    const charactersContainer = document.getElementById('characters-container');
    const searchBar = document.getElementById('search-bar');
    const characterDetails = document.getElementById('character-details');
    const container = document.querySelector('.container'); // Container principal
    const darkModeToggle = document.getElementById('dark-mode-toggle');

    let characters = []; // Vai armazenar os dados dos personagens

    // Função para buscar e exibir os personagens
    async function fetchCharacters() {
        try {
            const response = await fetch('https://hp-api.onrender.com/api/characters');
            characters = await response.json(); // Salva os personagens

            displayCharacters(characters); // Exibe todos inicialmente
        } catch (error) {
            console.error('Erro ao buscar personagens:', error);
        }
    }

    // Função para exibir os personagens
    function displayCharacters(filteredCharacters) {
        charactersContainer.innerHTML = ''; // Limpa os resultados anteriores

        filteredCharacters.forEach(character => {
            const characterCard = document.createElement('div');
            characterCard.classList.add('character-card');
            characterCard.addEventListener('click', () => showCharacterDetails(character)); // Evento de clique no card

            characterCard.innerHTML = `
                <img src="${character.image}" alt="${character.name}">
                <h3>${character.name}</h3>
                <p><strong>Casa:</strong> ${character.house || 'Desconhecida'}</p>
                <p><strong>Espécie:</strong> ${character.species || 'Desconhecida'}</p>
            `;

            charactersContainer.appendChild(characterCard);
        });
    }

    // Função para mostrar os detalhes do personagem
    function showCharacterDetails(character) {
        // Esconde os outros personagens
        charactersContainer.style.display = 'none';
        
        // Exibe os detalhes do personagem
        characterDetails.style.display = 'block';
        characterDetails.innerHTML = `
            <div class="character-details-container">
                <img class="detail-image" src="${character.image}" alt="${character.name}">
                <div class="character-info">
                    <h2>${character.name}</h2>
                    <p><span class="detail-title">Espécie:</span> ${character.species || 'Desconhecida'}</p>
                    <p><span class="detail-title">Gênero:</span> ${character.gender || 'Desconhecido'}</p>
                    <p><span class="detail-title">Casa:</span> ${character.house || 'Desconhecida'}</p>
                    <p><span class="detail-title">Data de Nascimento:</span> ${character.dateOfBirth || 'Desconhecida'}</p>
                    <p><span class="detail-title">Ano de Nascimento:</span> ${character.yearOfBirth || 'Desconhecido'}</p>
                    <p><span class="detail-title">Feiticeiro:</span> ${character.wizard ? 'Sim' : 'Não'}</p>
                    <p><span class="detail-title">Ancestralidade:</span> ${character.ancestry || 'Desconhecida'}</p>
                    <p><span class="detail-title">Cor dos Olhos:</span> ${character.eyeColour || 'Desconhecida'}</p>
                    <p><span class="detail-title">Cor do Cabelo:</span> ${character.hairColour || 'Desconhecida'}</p>
                    <p><span class="detail-title">Patronus:</span> ${character.patronus || 'Desconhecido'}</p>
                    <p><span class="detail-title">Estudante de Hogwarts:</span> ${character.hogwartsStudent ? 'Sim' : 'Não'}</p>
                    <p><span class="detail-title">Funcionário de Hogwarts:</span> ${character.hogwartsStaff ? 'Sim' : 'Não'}</p>
                    <p><span class="detail-title">Nomes Alternativos:</span> ${character.alternate_names.join(', ') || 'Nenhum'}</p>
                    <p><span class="detail-title">Varinha:</span></p>
                        <ul>
                            <li><strong>Madeira:</strong> ${character.wand?.wood || 'Desconhecida'}</li>
                            <li><strong>Núcleo:</strong> ${character.wand?.core || 'Desconhecido'}</li>
                            <li><strong>Comprimento:</strong> ${character.wand?.length || 'Desconhecido'} polegadas</li>
                        </ul>
                    <p><span class="detail-title">Ator:</span> ${character.actor || 'Desconhecido'}</p>
                    
                    <button id="back-button">Voltar</button>
                </div>
            </div>
        `;

        // Adiciona funcionalidade de voltar
        document.getElementById('back-button').addEventListener('click', goBack);
    }

    // Função para voltar à lista de personagens
    function goBack() {
        // Exibe novamente os cards de personagens
        charactersContainer.style.display = 'flex';
        characterDetails.style.display = 'none';
    }

    // Função de filtro da pesquisa
    function filterCharacters() {
        const searchQuery = searchBar.value.toLowerCase(); // Obtem a pesquisa em minúsculas

        // Filtra os personagens com base no nome, casa ou espécie
        const filteredCharacters = characters.filter(character => {
            const nameMatch = character.name ? character.name.toLowerCase().includes(searchQuery) : false;
            const houseMatch = character.house ? character.house.toLowerCase().includes(searchQuery) : false;
            const speciesMatch = character.species ? character.species.toLowerCase().includes(searchQuery) : false;

            return nameMatch || houseMatch || speciesMatch;
        });

        // Exibe os personagens filtrados
        displayCharacters(filteredCharacters);
    }

    // Adiciona evento de input na barra de pesquisa
    searchBar.addEventListener('input', filterCharacters);

    // Função para alternar entre modo claro e modo escuro
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
    }

    // Adiciona evento de clique no botão de modo escuro
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Chama a função para buscar e exibir os personagens
    fetchCharacters();
});
