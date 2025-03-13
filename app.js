document.addEventListener('DOMContentLoaded', () => {
    const charactersContainer = document.getElementById('characters-container');
    const charactersList = document.getElementById('characters-list');
    const searchBar = document.getElementById('search-bar');
    const backButton = document.getElementById('back-button');
    const fundoCasa = document.getElementById('fundo-casa');
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
            card.innerHTML = `
                <img src="${character.image || './imgs/placeholder.jpg'}" alt="${character.name}">
                <h3>${character.name}</h3>
                <p><strong>Casa:</strong> ${character.house || 'Desconhecida'}</p>
                <p><strong>Espécie:</strong> ${character.species || 'Desconhecida'}</p>
            `;
            charactersList.appendChild(card);
        });
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

    // Função para voltar à página inicial
    function goBack() {
        charactersContainer.style.display = 'none';
        searchBar.style.display = 'none';
        backButton.style.display = 'none';
        fundoCasa.style.display = 'none'; // Oculta o fundo da casa
    }

    // Evento de clique nos quadrantes das casas
    quadrantes.forEach(quadrante => {
        quadrante.addEventListener('click', () => {
            currentHouse = quadrante.getAttribute('data-house');
            const filteredCharacters = allCharacters.filter(character => character.house === currentHouse);

            // Define o fundo da casa selecionada
            fundoCasa.style.display = 'flex';
            fundoCasa.style.backgroundColor = getHouseColor(currentHouse);
            fundoCasa.innerHTML = `<img src="./imgs/casas/${currentHouse.toUpperCase()}.webp" alt="${currentHouse}">`;

            charactersContainer.style.display = 'block';
            searchBar.style.display = 'none';
            backButton.style.display = 'block';
            displayCharacters(filteredCharacters);
        });
    });

    // Evento de clique no botão central para exibir todos os personagens
    botaoCentral.addEventListener('click', () => {
        currentHouse = null;
        charactersContainer.style.display = 'block';
        searchBar.style.display = 'block';
        backButton.style.display = 'block';
        fundoCasa.style.display = 'none'; // Oculta o fundo da casa
        displayCharacters(allCharacters);
    });

    // Evento de input na barra de pesquisa
    searchBar.addEventListener('input', filterCharacters);

    // Evento de clique no botão de voltar
    backButton.addEventListener('click', goBack);

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