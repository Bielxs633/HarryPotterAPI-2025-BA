'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const charactersContainer = document.getElementById('characters-container')
    const charactersList = document.getElementById('characters-list')
    const searchBar = document.getElementById('search-bar')
    const backButton = document.getElementById('back-button')
    const fundoCasa = document.getElementById('fundo-casa')
    const characterDetails = document.getElementById('character-details')
    const quadrantes = document.querySelectorAll('.quadrante')
    const botaoCentral = document.getElementById('mostrar-todos')

    let allCharacters = []
    let currentHouse = null

    // Função para buscar personagens da API
    async function fetchCharacters(){
        try {
            const response = await fetch('https://hp-api.onrender.com/api/characters')
            allCharacters = await response.json()
        } catch (error){
            console.error('Erro ao buscar personagens:', error)
        }
    }

    // Função para exibir personagens
    function displayCharacters(characters){
        // Limpa o conteúdo atual
        while (charactersList.firstChild){
            charactersList.removeChild(charactersList.firstChild)
        }

        characters.forEach(character => {
            const card = document.createElement('div')
            card.classList.add('character-card')
            card.addEventListener('click', () => showCharacterDetails(character))

            // Cria a imagem do personagem
            const img = document.createElement('img')
            img.src = character.image || './imgs/placeholder.jpg'
            img.alt = character.name

            // Cria o nome do personagem
            const name = document.createElement('h3')
            name.textContent = character.name

            // Cria a casa do personagem
            const house = document.createElement('p')
            const houseStrong = document.createElement('strong')
            houseStrong.textContent = 'Casa:'
            house.appendChild(houseStrong)
            house.appendChild(document.createTextNode(` ${character.house || 'Desconhecida'}`))

            // Cria a espécie do personagem
            const species = document.createElement('p')
            const speciesStrong = document.createElement('strong')
            speciesStrong.textContent = 'Espécie:'
            species.appendChild(speciesStrong)
            species.appendChild(document.createTextNode(` ${character.species || 'Desconhecida'}`))

            // Adiciona os elementos ao cartão
            card.appendChild(img)
            card.appendChild(name)
            card.appendChild(house)
            card.appendChild(species)

            // Adiciona o cartão à lista de personagens
            charactersList.appendChild(card)
        })
    }

    // Função para mostrar os detalhes do personagem
    function showCharacterDetails(character){
        charactersContainer.style.display = 'none'
        characterDetails.style.display = 'flex'

        // Limpa o conteúdo anterior
        while (characterDetails.firstChild){
            characterDetails.removeChild(characterDetails.firstChild)
        }

        // Adiciona evento de clique no fundo
        characterDetails.addEventListener('click', (e) => {
            if (e.target === characterDetails) {
                goBackToCharacters()
            }
        })

        // Cria o container de detalhes
        const detailsContainer = document.createElement('div')
        detailsContainer.classList.add('character-details-container')

        // Cria a imagem do personagem
        const img = document.createElement('img')
        img.classList.add('detail-image')
        img.src = character.image || './imgs/placeholder.jpg'
        img.alt = character.name

        // Cria o container de informações
        const infoContainer = document.createElement('div')
        infoContainer.classList.add('character-info')

        // Cria o nome do personagem
        const name = document.createElement('h2')
        const nameStrong = document.createElement('strong')
        nameStrong.textContent = character.name
        name.appendChild(nameStrong)

        // Função auxiliar para criar detalhes
        function createDetail(title, value){
            const p = document.createElement('p')
            const span = document.createElement('span')
            span.classList.add('detail-title')
            span.textContent = `${title}:`
            p.appendChild(span)
            p.appendChild(document.createTextNode(` ${value || 'Desconhecido(a)'}`))
            return p
        }

        // Cria os detalhes do personagem
        const species = createDetail('Espécie', character.species)
        const gender = createDetail('Gênero', character.gender)
        const house = createDetail('Casa', character.house)
        const dateOfBirth = createDetail('Data de Nascimento', character.dateOfBirth)
        const yearOfBirth = createDetail('Ano de Nascimento', character.yearOfBirth)
        const wizard = createDetail('Feiticeiro', character.wizard ? 'Sim' : 'Não')
        const ancestry = createDetail('Ancestralidade', character.ancestry)
        const eyeColour = createDetail('Cor dos Olhos', character.eyeColour)
        const hairColour = createDetail('Cor do Cabelo', character.hairColour)
        const patronus = createDetail('Patronus', character.patronus)
        const hogwartsStudent = createDetail('Estudante de Hogwarts', character.hogwartsStudent ? 'Sim' : 'Não')
        const hogwartsStaff = createDetail('Funcionário de Hogwarts', character.hogwartsStaff ? 'Sim' : 'Não')
        const alternateNames = createDetail('Nomes Alternativos', character.alternate_names?.join(', ') || 'Nenhum')

        // Cria os detalhes da varinha
        const wand = document.createElement('p')
        const wandTitle = document.createElement('span')
        wandTitle.classList.add('detail-title')
        wandTitle.textContent = 'Varinha:'
        wand.appendChild(wandTitle)

        const wandDetails = document.createElement('ul')
        const wandWood = document.createElement('li')
        const wandWoodStrong = document.createElement('strong')
        wandWoodStrong.textContent = 'Madeira:'
        wandWood.appendChild(wandWoodStrong)
        wandWood.appendChild(document.createTextNode(` ${character.wand?.wood || 'Desconhecida'}`))

        const wandCore = document.createElement('li')
        const wandCoreStrong = document.createElement('strong')
        wandCoreStrong.textContent = 'Núcleo:'
        wandCore.appendChild(wandCoreStrong)
        wandCore.appendChild(document.createTextNode(` ${character.wand?.core || 'Desconhecido'}`))

        const wandLength = document.createElement('li')
        const wandLengthStrong = document.createElement('strong')
        wandLengthStrong.textContent = 'Comprimento:'
        wandLength.appendChild(wandLengthStrong)
        wandLength.appendChild(document.createTextNode(` ${character.wand?.length || 'Desconhecido'} polegadas`))

        wandDetails.appendChild(wandWood)
        wandDetails.appendChild(wandCore)
        wandDetails.appendChild(wandLength)

        // Cria o ator
        const actor = createDetail('Ator', character.actor)

        // Cria o botão de voltar
        const backButtonDetails = document.createElement('button')
        backButtonDetails.id = 'back-button-details'
        backButtonDetails.textContent = 'Voltar'
        backButtonDetails.addEventListener('click', goBackToCharacters)

        // Adiciona os elementos ao container de informações
        infoContainer.appendChild(name)
        infoContainer.appendChild(species)
        infoContainer.appendChild(gender)
        infoContainer.appendChild(house)
        infoContainer.appendChild(dateOfBirth)
        infoContainer.appendChild(yearOfBirth)
        infoContainer.appendChild(wizard)
        infoContainer.appendChild(ancestry)
        infoContainer.appendChild(eyeColour)
        infoContainer.appendChild(hairColour)
        infoContainer.appendChild(patronus)
        infoContainer.appendChild(hogwartsStudent)
        infoContainer.appendChild(hogwartsStaff)
        infoContainer.appendChild(alternateNames)
        infoContainer.appendChild(wand)
        infoContainer.appendChild(wandDetails)
        infoContainer.appendChild(actor)
        infoContainer.appendChild(backButtonDetails)

        // Adiciona a imagem e o container de informações ao container de detalhes
        detailsContainer.appendChild(img)
        detailsContainer.appendChild(infoContainer)

        // Adiciona o container de detalhes ao elemento principal
        characterDetails.appendChild(detailsContainer)
    }

    // Função para voltar à lista de personagens
    function goBackToCharacters(){
        charactersContainer.style.display = 'block'
        characterDetails.style.display = 'none'
        // Remove o event listener para evitar múltiplas instâncias
        characterDetails.removeEventListener('click', goBackToCharacters)
    }

    // Função para voltar à tela inicial
    function goBackToHome(){
        charactersContainer.style.display = 'none'
        fundoCasa.style.display = 'none'
        searchBar.style.display = 'none'
        backButton.style.display = 'none'
        // Remove o event listener para evitar múltiplas instâncias
        charactersContainer.removeEventListener('click', goBackToHome)
    }

    // Função para filtrar personagens
    function filterCharacters(){
        const searchQuery = searchBar.value.toLowerCase()
        const filteredCharacters = allCharacters.filter(character => {
            const nameMatch = character.name.toLowerCase().includes(searchQuery)
            const houseMatch = character.house && character.house.toLowerCase().includes(searchQuery)
            const speciesMatch = character.species && character.species.toLowerCase().includes(searchQuery)
            return nameMatch || houseMatch || speciesMatch
        })
        displayCharacters(filteredCharacters)
    }

    // Evento de clique nos quadrantes das casas
    quadrantes.forEach(quadrante => {
        quadrante.addEventListener('click', () => {
            currentHouse = quadrante.getAttribute('data-house')
            const filteredCharacters = allCharacters.filter(character => character.house === currentHouse)
            charactersContainer.style.display = 'block'
            searchBar.style.display = 'none'
            backButton.style.display = 'block'
            fundoCasa.style.display = 'flex'
            fundoCasa.style.backgroundColor = getHouseColor(currentHouse)

            // Limpa o conteúdo anterior de fundoCasa
            while (fundoCasa.firstChild){
                fundoCasa.removeChild(fundoCasa.firstChild)
            }

            // Cria a nova imagem da casa
            const img = document.createElement('img')
            img.src = `./imgs/casas/${currentHouse.toUpperCase()}.webp`
            img.alt = currentHouse

            // Adiciona a imagem ao fundoCasa
            fundoCasa.appendChild(img)

            // Adiciona evento de clique no fundo
            charactersContainer.addEventListener('click', (e) => {
                if (e.target === charactersContainer) {
                    goBackToHome()
                }
            })

            // Exibe os personagens da casa selecionada
            displayCharacters(filteredCharacters)
        })
    })

    // Evento de clique no botão central para exibir todos os personagens
    botaoCentral.addEventListener('click', () => {
        currentHouse = null;
        charactersContainer.style.display = 'block'
        searchBar.style.display = 'block'
        backButton.style.display = 'block'
        fundoCasa.style.display = 'none'
        
        // Adiciona evento de clique no fundo
        charactersContainer.addEventListener('click', (e) => {
            if (e.target === charactersContainer) {
                goBackToHome()
            }
        })
        
        displayCharacters(allCharacters)
    })

    // Evento de input na barra de pesquisa
    searchBar.addEventListener('input', filterCharacters)

    // Evento de clique no botão de voltar
    backButton.addEventListener('click', goBackToHome)

    // Função para obter a cor da casa
    function getHouseColor(house){
        switch (house){
            case 'Gryffindor': return '#7F0909'
            case 'Slytherin': return '#1A472A'
            case 'Hufflepuff': return '#FFD700'
            case 'Ravenclaw': return '#0D2265'
            default: return 'rgba(0, 0, 0, 0.8)'
        }
    }

    // Carregar os personagens ao iniciar a página
    fetchCharacters()
})