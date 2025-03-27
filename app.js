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

    async function fetchCharacters(){
        try {
            const response = await fetch('https://hp-api.onrender.com/api/characters')
            allCharacters = await response.json()
        } catch (error){
            console.error('Erro ao buscar personagens:', error)
        }
    }

    function displayCharacters(characters){
        while (charactersList.firstChild){
            charactersList.removeChild(charactersList.firstChild)
        }

        characters.forEach(character => {
            const card = document.createElement('div')
            card.classList.add('character-card')
            card.addEventListener('click', () => showCharacterDetails(character))

            const img = document.createElement('img')
            img.src = character.image || './imgs/placeholder.jpg'
            img.alt = character.name

            const name = document.createElement('h3')
            name.textContent = character.name

            const house = document.createElement('p')
            const houseStrong = document.createElement('strong')
            houseStrong.textContent = 'Casa:'
            house.appendChild(houseStrong)
            house.appendChild(document.createTextNode(` ${character.house || 'Desconhecida'}`))

            const species = document.createElement('p')
            const speciesStrong = document.createElement('strong')
            speciesStrong.textContent = 'Espécie:'
            species.appendChild(speciesStrong)
            species.appendChild(document.createTextNode(` ${character.species || 'Desconhecida'}`))

            card.appendChild(img)
            card.appendChild(name)
            card.appendChild(house)
            card.appendChild(species)
            charactersList.appendChild(card)
        })
    }

    function showCharacterDetails(character){
        charactersContainer.style.display = 'none'
        characterDetails.style.display = 'flex'

        while (characterDetails.firstChild){
            characterDetails.removeChild(characterDetails.firstChild)
        }

        characterDetails.addEventListener('click', (e) => {
            if (e.target === characterDetails) {
                goBackToCharacters()
            }
        })

        const detailsContainer = document.createElement('div')
        detailsContainer.classList.add('character-details-container')

        // Botão de fechar (X)
        const closeButton = document.createElement('button')
        closeButton.classList.add('close-button')
        closeButton.innerHTML = '&times;'
        closeButton.setAttribute('aria-label', 'Fechar detalhes')
        closeButton.addEventListener('click', goBackToCharacters)
        detailsContainer.appendChild(closeButton)

        const img = document.createElement('img')
        img.classList.add('detail-image')
        img.src = character.image || './imgs/placeholder.jpg'
        img.alt = character.name

        const infoContainer = document.createElement('div')
        infoContainer.classList.add('character-info')

        const name = document.createElement('h2')
        name.textContent = character.name

        function createDetail(title, value){
            const p = document.createElement('p')
            const span = document.createElement('span')
            span.classList.add('detail-title')
            span.textContent = `${title}:`
            p.appendChild(span)
            p.appendChild(document.createTextNode(` ${value || 'Desconhecido(a)'}`))
            return p
        }

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

        const wand = document.createElement('p')
        const wandTitle = document.createElement('span')
        wandTitle.classList.add('detail-title')
        wandTitle.textContent = 'Varinha:'
        wand.appendChild(wandTitle)

        const wandDetails = document.createElement('ul')
        const wandWood = document.createElement('li')
        wandWood.innerHTML = `<strong>Madeira:</strong> ${character.wand?.wood || 'Desconhecida'}`
        
        const wandCore = document.createElement('li')
        wandCore.innerHTML = `<strong>Núcleo:</strong> ${character.wand?.core || 'Desconhecido'}`
        
        const wandLength = document.createElement('li')
        wandLength.innerHTML = `<strong>Comprimento:</strong> ${character.wand?.length || 'Desconhecido'} polegadas`

        wandDetails.appendChild(wandWood)
        wandDetails.appendChild(wandCore)
        wandDetails.appendChild(wandLength)

        const actor = createDetail('Ator', character.actor)

        const backButtonDetails = document.createElement('button')
        backButtonDetails.id = 'back-button-details'
        backButtonDetails.textContent = 'Voltar'
        backButtonDetails.addEventListener('click', goBackToCharacters)

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

        detailsContainer.appendChild(img)
        detailsContainer.appendChild(infoContainer)
        characterDetails.appendChild(detailsContainer)
    }

    function goBackToCharacters(){
        charactersContainer.style.display = 'block'
        characterDetails.style.display = 'none'
        characterDetails.removeEventListener('click', goBackToCharacters)
    }

    function goBackToHome(){
        charactersContainer.style.display = 'none'
        fundoCasa.style.display = 'none'
        searchBar.style.display = 'none'
        backButton.style.display = 'none'
        charactersContainer.removeEventListener('click', goBackToHome)
    }

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

    quadrantes.forEach(quadrante => {
        quadrante.addEventListener('click', () => {
            currentHouse = quadrante.getAttribute('data-house')
            const filteredCharacters = allCharacters.filter(character => character.house === currentHouse)
            charactersContainer.style.display = 'block'
            searchBar.style.display = 'none'
            backButton.style.display = 'block'
            fundoCasa.style.display = 'flex'
            fundoCasa.style.backgroundColor = getHouseColor(currentHouse)

            while (fundoCasa.firstChild){
                fundoCasa.removeChild(fundoCasa.firstChild)
            }

            const img = document.createElement('img')
            img.src = `./imgs/casas/${currentHouse.toUpperCase()}.webp`
            img.alt = currentHouse
            fundoCasa.appendChild(img)

            charactersContainer.addEventListener('click', (e) => {
                if (e.target === charactersContainer) {
                    goBackToHome()
                }
            })

            displayCharacters(filteredCharacters)
        })
    })

    botaoCentral.addEventListener('click', () => {
        currentHouse = null;
        charactersContainer.style.display = 'block'
        searchBar.style.display = 'block'
        backButton.style.display = 'block'
        fundoCasa.style.display = 'none'
        
        charactersContainer.addEventListener('click', (e) => {
            if (e.target === charactersContainer) {
                goBackToHome()
            }
        })
        
        displayCharacters(allCharacters)
    })

    searchBar.addEventListener('input', filterCharacters)
    backButton.addEventListener('click', goBackToHome)

    function getHouseColor(house){
        switch (house){
            case 'Gryffindor': return '#7F0909'
            case 'Slytherin': return '#1A472A'
            case 'Hufflepuff': return '#FFD700'
            case 'Ravenclaw': return '#0D2265'
            default: return 'rgba(0, 0, 0, 0.8)'
        }
    }

    fetchCharacters()
})