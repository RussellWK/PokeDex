
let textInfo = document.getElementById("info")
let searchButton = document.getElementById("search")
let nextButton = document.getElementById("next")
let previousButton = document.getElementById("previous")
let statsButton = document.getElementById("statsButton")
let infoButton = document.getElementById("infoButton")
let abilitiesButton = document.getElementById("abilitiesButton")
let allButton = document.getElementById("allPokemon")
let kantoButton = document.getElementById("kanto")
let johtoButton = document.getElementById("johto")
let selectPokemon = document.getElementById("selectPokemon")
let previous20 = document.getElementById("previous20")
let next20 = document.getElementById("next20")

let id, text, statsText, abilitiesText, startRegion, endRegion, numberOfPokemon
let startPokemonList = 0
let firstLoad = true

let capitalize = function(name){
    let newName = ''
    let items = name.split('-')
    for (let i=0; i<items.length; i++){
        newName+=items[i][0].toUpperCase() + items[i].slice(1,)+' '
    }
    return newName
}

selectPokemon.addEventListener('change', event => {
    if(selectPokemon.value!='false'){
        loadPokemon(selectPokemon.value)
    }
})

allButton.addEventListener('click', event =>{
    selectRegion('national')
})

kantoButton.addEventListener('click', event =>{
    selectRegion('kanto')
})

johtoButton.addEventListener('click', event =>{
    selectRegion('original-johto')
})

searchButton.addEventListener('click', event =>{
    pokemonName = document.getElementById("pokemon")
    let formatedName = (pokemonName.value).toLowerCase()
    loadPokemon(formatedName)

})

nextButton.addEventListener('click', event =>{
    id = id+1
    if (id>endRegion || id<startRegion){
        id=startRegion
    }
    loadPokemon(id)
})
previousButton.addEventListener('click', event =>{
    id = id-1
    if (id<startRegion || id>endRegion){
        id = endRegion
    }
    loadPokemon(id)
})

infoButton.addEventListener('click', event =>{
    textInfo.innerHTML = text
})

statsButton.addEventListener('click', event =>{
    textInfo.innerHTML = statsText
})

abilitiesButton.addEventListener('click', event =>{
    textInfo.innerHTML = abilitiesText
})

let loadBasicInfo = function(data){
    text = '<b>Basic Info</b><Br/><Br/>'+"ID : "+id
    +'<br/><br/>Base XP : '+data.base_experience
    +'<br/><br/>Height : '+data.height
    +'<br/><br/>Types : '

    for (let i = 0; i<data.types.length; i++){
        if (i===0){
            text+= data.types[i].type.name
        }
        else{
            text+= ', '+ data.types[i].type.name  
        }
    }
    text+='<br/><br/>'
}

let loadStats = function(data){
    statsText='<b>Stats</b><Br/><Br/>'
    for (let i = 0; i<data.stats.length; i++){
        statsText += 'Base '+data.stats[i].stat.name+' : '+data.stats[i].base_stat+'<br/><br/>'
    } 
}

let loadAbilities = async function(data){
    abilitiesText='<b>Abilities</b><Br/><Br/>'
    for (let i = 0; i<data.abilities.length; i++){
        abilitiesText += '<b>'+data.abilities[i].ability.name+'</b><br/>'
        await fetch(data.abilities[i].ability.url) 
        .then(response => {return response.json()}) 
        .then(abilityData=>{
            for (let i = 0; i<abilityData.effect_entries.length; i++){
                if (abilityData.effect_entries[i].language.name==="en"){
                    abilitiesText+='<em>'+abilityData.effect_entries[i].effect +'</em>'
                    +'<br/><br/>'
                    break
                }
            }
        })
    } 
}

let loadPokemonList = function(){
    let pokemonList = '<option value="false">--Select Pokemon--</option>'
    let numberInList = 20
    if (numberOfPokemon-startPokemonList<20){
        numberInList = numberOfPokemon-startPokemonList
    }
    let pokemonListURL = 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset='+startPokemonList
    document.getElementById('pokemonListLabel').innerHTML = "ID's ("+(startPokemonList+1)+' : '+(startPokemonList+numberInList)+')'
    fetch(pokemonListURL)
    .then(response => {return response.json()})
    .then(pokemonListData=>{
        for (let i = 0; i<numberInList; i++){
            pokemonList+='<option value="'+pokemonListData.results[i].name+'">'+pokemonListData.results[i].name+'</option>'
        }
        selectPokemon.innerHTML = pokemonList
    })
}

previous20.addEventListener('click', event=>{
    if (startPokemonList>=20){
        startPokemonList-=20
        loadPokemonList()
    }
})

next20.addEventListener('click', event=>{
    if (startPokemonList<numberOfPokemon-20){
        startPokemonList+=20
        loadPokemonList()
    }
})

let selectRegion = function(region){
    let regionURL = 'https://pokeapi.co/api/v2/pokedex/'+region+'/'
    document.getElementById('regionLabel').innerHTML = 'Region : '+capitalize(region)
    fetch(regionURL)
    .then(response => {return response.json()})
    .then(data=>{
        let seperatedURL = data.pokemon_entries[0].pokemon_species.url.split('/')
        startRegion=seperatedURL[seperatedURL.length-2]
        loadPokemon(startRegion)
        seperatedURL = data.pokemon_entries[data.pokemon_entries.length-1].pokemon_species.url.split('/')
        endRegion=seperatedURL[seperatedURL.length-2]
        if (firstLoad===true){
            firstLoad=false
            numberOfPokemon=endRegion
        }
    })   
}

let loadPokemon = function(nameOrId){
    let newURL = "https://pokeapi.co/api/v2/pokemon/"+nameOrId+"/"
    fetch(newURL)
    .then(response => {return response.json()})
    .then(data=>{
    id = data.id
    let apiName = data.name
    let image = data.sprites.front_default
    document.getElementById("image").src = image
    document.getElementById("name").innerHTML = capitalize(apiName)
    loadBasicInfo(data)
    textInfo.innerHTML = text
    
    loadStats(data)
    loadAbilities(data)
    })
}

selectRegion('national')
loadPokemonList()