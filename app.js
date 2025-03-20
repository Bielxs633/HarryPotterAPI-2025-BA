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
        // Limpa o conteúdo atual
        while (charactersList.firstChild) {
            charactersList.removeChild(charactersList.firstChild);
        }

        characters.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('character-card');
            card.addEventListener('click', () => showCharacterDetails(character));

            // Cria a imagem do personagem
            const img = document.createElement('img');
            img.src = character.image || './imgs/placeholder.jpg';
            img.alt = character.name;

            // Cria o nome do personagem
            const name = document.createElement('h3');
            name.textContent = character.name;

            // Cria a casa do personagem
            const house = document.createElement('p');
            house.innerHTML = `<strong>Casa:</strong> ${character.house || 'Desconhecida'}`;

            // Cria a espécie do personagem
            const species = document.createElement('p');
            species.innerHTML = `<strong>Espécie:</strong> ${character.species || 'Desconhecida'}`;

            // Adiciona os elementos ao cartão
            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(house);
            card.appendChild(species);

            // Adiciona o cartão à lista de personagens
            charactersList.appendChild(card);
        });
    }

    // Função para mostrar os detalhes do personagem
    function showCharacterDetails(character) {
        charactersContainer.style.display = 'none';
        characterDetails.style.display = 'flex';

        // Limpa o conteúdo anterior
        while (characterDetails.firstChild) {
            characterDetails.removeChild(characterDetails.firstChild);
        }

        // Cria o container de detalhes
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('character-details-container');

        // Cria a imagem do personagem
        const img = document.createElement('img');
        img.classList.add('detail-image');
        img.src = character.image || './imgs/placeholder.jpg';
        img.alt = character.name;

        // Cria o container de informações
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('character-info');

        // Cria o nome do personagem
        const name = document.createElement('h2');
        name.innerHTML = `<strong>${character.name}</strong>`;

        // Cria os detalhes do personagem
        const species = document.createElement('p');
        species.innerHTML = `<span class="detail-title">Espécie:</span> ${character.species || 'Desconhecida'}`;

        const gender = document.createElement('p');
        gender.innerHTML = `<span class="detail-title">Gênero:</span> ${character.gender || 'Desconhecido'}`;

        const house = document.createElement('p');
        house.innerHTML = `<span class="detail-title">Casa:</span> ${character.house || 'Desconhecida'}`;

        const dateOfBirth = document.createElement('p');
        dateOfBirth.innerHTML = `<span class="detail-title">Data de Nascimento:</span> ${character.dateOfBirth || 'Desconhecida'}`;

        const yearOfBirth = document.createElement('p');
        yearOfBirth.innerHTML = `<span class="detail-title">Ano de Nascimento:</span> ${character.yearOfBirth || 'Desconhecido'}`;

        const wizard = document.createElement('p');
        wizard.innerHTML = `<span class="detail-title">Feiticeiro:</span> ${character.wizard ? 'Sim' : 'Não'}`;

        const ancestry = document.createElement('p');
        ancestry.innerHTML = `<span class="detail-title">Ancestralidade:</span> ${character.ancestry || 'Desconhecida'}`;

        const eyeColour = document.createElement('p');
        eyeColour.innerHTML = `<span class="detail-title">Cor dos Olhos:</span> ${character.eyeColour || 'Desconhecida'}`;

        const hairColour = document.createElement('p');
        hairColour.innerHTML = `<span class="detail-title">Cor do Cabelo:</span> ${character.hairColour || 'Desconhecida'}`;

        const patronus = document.createElement('p');
        patronus.innerHTML = `<span class="detail-title">Patronus:</span> ${character.patronus || 'Desconhecido'}`;

        const hogwartsStudent = document.createElement('p');
        hogwartsStudent.innerHTML = `<span class="detail-title">Estudante de Hogwarts:</span> ${character.hogwartsStudent ? 'Sim' : 'Não'}`;

        const hogwartsStaff = document.createElement('p');
        hogwartsStaff.innerHTML = `<span class="detail-title">Funcionário de Hogwarts:</span> ${character.hogwartsStaff ? 'Sim' : 'Não'}`;

        const alternateNames = document.createElement('p');
        alternateNames.innerHTML = `<span class="detail-title">Nomes Alternativos:</span> ${character.alternate_names.join(', ') || 'Nenhum'}`;

        const wand = document.createElement('p');
        wand.innerHTML = `<span class="detail-title">Varinha:</span>`;

        const wandDetails = document.createElement('ul');
        wandDetails.innerHTML = `
            <li><strong>Madeira:</strong> ${character.wand?.wood || 'Desconhecida'}</li>
            <li><strong>Núcleo:</strong> ${character.wand?.core || 'Desconhecido'}</li>
            <li><strong>Comprimento:</strong> ${character.wand?.length || 'Desconhecido'} polegadas</li>
        `;

        const actor = document.createElement('p');
        actor.innerHTML = `<span class="detail-title">Ator:</span> ${character.actor || 'Desconhecido'}`;

        // Cria o botão de voltar
        const backButtonDetails = document.createElement('button');
        backButtonDetails.id = 'back-button-details';
        backButtonDetails.textContent = 'Voltar';
        backButtonDetails.addEventListener('click', goBackToCharacters);

        // Adiciona os elementos ao container de informações
        infoContainer.appendChild(name);
        infoContainer.appendChild(species);
        infoContainer.appendChild(gender);
        infoContainer.appendChild(house);
        infoContainer.appendChild(dateOfBirth);
        infoContainer.appendChild(yearOfBirth);
        infoContainer.appendChild(wizard);
        infoContainer.appendChild(ancestry);
        infoContainer.appendChild(eyeColour);
        infoContainer.appendChild(hairColour);
        infoContainer.appendChild(patronus);
        infoContainer.appendChild(hogwartsStudent);
        infoContainer.appendChild(hogwartsStaff);
        infoContainer.appendChild(alternateNames);
        infoContainer.appendChild(wand);
        infoContainer.appendChild(wandDetails);
        infoContainer.appendChild(actor);
        infoContainer.appendChild(backButtonDetails);

        // Adiciona a imagem e o container de informações ao container de detalhes
        detailsContainer.appendChild(img);
        detailsContainer.appendChild(infoContainer);

        // Adiciona o container de detalhes ao elemento principal
        characterDetails.appendChild(detailsContainer);
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

            // Atualiza o fundo da casa
            const img = document.createElement('img');
            img.src = `./imgs/casas/${currentHouse.toUpperCase()}.webp`;
            img.alt = currentHouse;
            fundoCasa.innerHTML = ''; // Limpa o conteúdo anterior
            fundoCasa.appendChild(img);

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