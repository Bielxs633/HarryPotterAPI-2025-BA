document.addEventListener('DOMContentLoaded', () => {
    const charactersContainer = document.getElementById('characters-container');
    const charactersList = document.getElementById('characters-list');
    const searchBar = document.getElementById('search-bar');
    const backButton = document.getElementById('back-button');
    const fundoCasa = document.getElementById('fundo-casa');
    const characterDetails = document.getElementById('character-details');
    const quadrantes = document.querySelectorAll('.quadrante');
    const botaoCentral = document.getElementById('mostrar-todos');

    let allCharacters = [];
    let currentHouse = null;

    // Função para buscar personagens da API
    async function fetchCharacters() {
        try {
            const response = await fetch('https://hp-api.onrender.com/api/characters');
            allCharacters = await response.json();
        } catch (error) {
            console.error('Erro ao buscar personagens:', error);
        }
    }

    // Função para exibir personagens
    function displayCharacters(characters) {
        charactersList.innerHTML = '';
        characters.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('character-card');
            card.addEventListener('click', () => showCharacterDetails(character));

            card.innerHTML = `
                <img src="${character.image || './imgs/placeholder.jpg'}" alt="${character.name}">
                <h3>${character.name}</h3>
                <p><strong>Casa:</strong> ${character.house || 'Desconhecida'}</p>
                <p><strong>Espécie:</strong> ${character.species || 'Desconhecida'}</p>
            `;
            charactersList.appendChild(card);
        });
    }

    // Função para mostrar os detalhes do personagem
    function showCharacterDetails(character) {
        charactersContainer.style.display = 'none';
        characterDetails.style.display = 'block';

        characterDetails.innerHTML = `
            <div class="character-details-container">
                <img class="detail-image" src="${character.image || './imgs/placeholder.jpg'}" alt="${character.name}">
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
                    
                    <button id="back-button-details">Voltar</button>
                </div>
            </div>
        `;

        // Adiciona funcionalidade de voltar
        document.getElementById('back-button-details').addEventListener('click', goBackToCharacters);
    }

    // Função para voltar à lista de personagens
    function goBackToCharacters() {
        charactersContainer.style.display = 'block';
        characterDetails.style.display = 'none';
    }

    // Função para voltar à tela inicial
    function goBackToHome() {
        charactersContainer.style.display = 'none';
        fundoCasa.style.display = 'none';
        searchBar.style.display = 'none';
        backButton.style.display = 'none';
    }

    // Função para filtrar personagens
    function filterCharacters() {
        const searchQuery = searchBar.value.toLowerCase();
        const filteredCharacters = allCharacters.filter(character => {
            const nameMatch = character.name.toLowerCase().includes(searchQuery);
            const houseMatch = character.house && character.house.toLowerCase().includes(searchQuery);
            const speciesMatch = character.species && character.species.toLowerCase().includes(searchQuery);
            return nameMatch || houseMatch || speciesMatch;
        });
        displayCharacters(filteredCharacters);
    }

    // Evento de clique nos quadrantes das casas
    quadrantes.forEach(quadrante => {
        quadrante.addEventListener('click', () => {
            currentHouse = quadrante.getAttribute('data-house');
            const filteredCharacters = allCharacters.filter(character => character.house === currentHouse);
            charactersContainer.style.display = 'block';
            searchBar.style.display = 'none';
            backButton.style.display = 'block';
            fundoCasa.style.display = 'flex';
            fundoCasa.style.backgroundColor = getHouseColor(currentHouse);
            fundoCasa.innerHTML = `<img src="./imgs/casas/${currentHouse.toUpperCase()}.webp" alt="${currentHouse}">`;
            displayCharacters(filteredCharacters);
        });
    });

    // Evento de clique no botão central para exibir todos os personagens
    botaoCentral.addEventListener('click', () => {
        currentHouse = null;
        charactersContainer.style.display = 'block';
        searchBar.style.display = 'block';
        backButton.style.display = 'block';
        fundoCasa.style.display = 'none';
        displayCharacters(allCharacters);
    });

    // Evento de input na barra de pesquisa
    searchBar.addEventListener('input', filterCharacters);

    // Evento de clique no botão de voltar
    backButton.addEventListener('click', goBackToHome);

    // Função para obter a cor da casa
    function getHouseColor(house) {
        switch (house) {
            case 'Gryffindor': return '#7F0909';
            case 'Slytherin': return '#1A472A';
            case 'Hufflepuff': return '#FFD700';
            case 'Ravenclaw': return '#0D2265';
            default: return 'rgba(0, 0, 0, 0.8)';
        }
    }

    // Carregar os personagens ao iniciar a página
    fetchCharacters();
});