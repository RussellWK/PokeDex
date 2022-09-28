
let searchButton = document.getElementById("search")
let nextButton = document.getElementById("next")
let previousButton = document.getElementById("previous")
let statsButton = document.getElementById("statsButton")
let infoButton = document.getElementById("infoButton")
let abilitiesButton = document.getElementById("abilitiesButton")

let pokemonName = "Bulbasaur"
let id, numberOfPokemon, text, statsText, data

let createLength = async function(){
    let response= await fetch("https://pokeapi.co/api/v2/pokemon-species/")
    let data = await response.json()
    numberOfPokemon = data.count
}

let capitalize = function(string){
    return string[0].toUpperCase() + string.slice(1,)
}

searchButton.addEventListener('click', event =>{
    pokemonName = document.getElementById("pokemon")
    let formatedName = (pokemonName.value).toLowerCase()
    loadPokemon(formatedName)

})

nextButton.addEventListener('click', event =>{
    id = (id+1)%numberOfPokemon
    loadPokemon(id)
})
previousButton.addEventListener('click', event =>{
    id = id-1
    if (id<=0){
        id = numberOfPokemon
    }
    loadPokemon(id)
})

infoButton.addEventListener('click', event =>{
    document.getElementById("info").innerHTML = text
})

statsButton.addEventListener('click', event =>{
    statsText='<b>Stats</b><Br/><Br/>'
    for (let i = 0; i<data.stats.length; i++){
        statsText += 'Base '+data.stats[i].stat.name+' : '+data.stats[i].base_stat+'<br/><br/>'
    } 
    document.getElementById("info").innerHTML = statsText
})

abilitiesButton.addEventListener('click', event =>{
    abilitiesText='<b>Abilities</b><Br/><Br/>'
    for (let i = 0; i<data.abilities.length; i++){
        abilitiesText +=data.abilities[i].ability.name+'<br/><br/>'
        loadAbility(data.abilities[i].ability.url)  
    } 
    document.getElementById("info").innerHTML = abilitiesText
})

let loadAbility = async function(url){
    let responseAbilities= await fetch(url)
    let abilityData = await responseAbilities.json()
    abilitiesText += abilityData.flavor_text_entries[0].flavor_text +'<br/><br/>'
    console.log(abilitiesText)
}

let loadPokemon = async function(nameOrId){
    let url = "https://pokeapi.co/api/v2/pokemon/"+nameOrId+"/"
    let response= await fetch(url)
    data = await response.json()
    console.log(data)
    id = data.id
    apiName = data.name
    image = data.sprites.front_default
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
    document.getElementById("image").src = image
    document.getElementById("name").innerHTML = capitalize(apiName)
    document.getElementById("info").innerHTML = text
    }

createLength()
loadPokemon(1)