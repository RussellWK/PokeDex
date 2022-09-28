
let searchButton = document.getElementById("search")
let nextButton = document.getElementById("next")
let previousButton = document.getElementById("previous")
let statsButton = document.getElementById("statsButton")
let infoButton = document.getElementById("infoButton")
let abilitiesButton = document.getElementById("abilitiesButton")
let numberOfPokemon, data, id, text, statsText, abilitiesText

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
    document.getElementById("info").innerHTML = statsText
})

abilitiesButton.addEventListener('click', event =>{
    document.getElementById("info").innerHTML = abilitiesText
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
    }}

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
        //console.log(data.abilities[i].ability.url)
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


let loadPokemon = function(nameOrId){
    let newURL = "https://pokeapi.co/api/v2/pokemon/"+nameOrId+"/"
    fetch(newURL)
    .then(response => {return response.json()})
    .then(data=>{
    //console.log(data)
    id = data.id
    let apiName = data.name
    let image = data.sprites.front_default
    document.getElementById("image").src = image
    document.getElementById("name").innerHTML = capitalize(apiName)
    loadBasicInfo(data)
    document.getElementById("info").innerHTML = text
    loadStats(data)
    loadAbilities(data)
    })
    }


fetch("https://pokeapi.co/api/v2/pokemon-species/")
.then(response => {return response.json()})
.then(data=>{
    numberOfPokemon = data.count
    loadPokemon(Math.floor(Math.random()*numberOfPokemon+1))
})
