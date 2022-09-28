
let searchButton = document.getElementById("search")
let nextButton = document.getElementById("next")
let previousButton = document.getElementById("previous")
let pokemonName = "Bulbasaur"
let baseXp, height, id, numberOfPokemon

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

let loadPokemon = async function(nameOrId){
    let url = "https://pokeapi.co/api/v2/pokemon/"+nameOrId+"/"
    let response= await fetch(url)
    let data = await response.json()
    console.log(data)
    id = data.id
    apiName = data.name
    baseXp=data.base_experience
    height=data.height
    image=data.sprites.front_default
    document.getElementById("id").innerHTML = "ID : "+ id
    document.getElementById("image").src = image
    document.getElementById("name").innerHTML = capitalize(apiName)
    document.getElementById("baseXP").innerHTML = "Base XP : "+baseXp
    document.getElementById("height").innerHTML = "Height : "+ height
}
createLength()
loadPokemon(1)