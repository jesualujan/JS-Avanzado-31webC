//* MANIPULAR EL DOM PARA CREAR NUESTRO POKEDEX ( HTML + JAVASCRIPT )
//* VAMOS A UTILIAR FETCH PARA REALIZAR PETICIONES O LLAMADAS A LA API, ACCEDIENDO A SUS DATOS

const pokeContent = document.getElementById('pokemonContent')
const modalSearch = document.getElementById('pokemonContent')
const divGeneration = document.getElementById('textGen')
let pokeForm = document.getElementById('searchPokemon')
let generationShow = 1 // GENERACION POR DEFECTO

/* ordenar por generaciones 
    Pimera Gen 1 -151
    Segunda Gen 152 -251
    Tercera Gen 252-386
*/

function showPokemonGen(gen){
    const pokemonGen = {
        1: [1, 151],
        2: [152, 251],
        3: [252, 386]
    }

    const pokemonGenDefault = [1, 151]
    const generacion = pokemonGen[gen] || pokemonGenDefault
    return generacion
}

let pokemonGeneration =  showPokemonGen(generationShow)

/* cambiar de generacion */

let arrowRight = document.getElementById('arrow-right').addEventListener('click', e => {
    if(generationShow < 4) {
        modalSearch.innerHTML = ''
        generationShow += 1 // generationShow = generationShow + 1 
        pokemonGeneration = showPokemonGen(generationShow)
        divGeneration.innerHTML = 'Gen ' + generationShow
        drawPokemon()
        console.log(generationShow)
    }
})

let arrowLeft = document.getElementById('arrow-left').addEventListener('click', e => {
    if(generationShow > 0 ) {
        modalSearch.innerHTML = ''
        generationShow -= 1 // generationShow = generationShow + 1 
        pokemonGeneration = showPokemonGen(generationShow)
        divGeneration.innerHTML = 'Gen ' + generationShow
        drawPokemon()
        console.log(generationShow)
    }
})

const drawPokemon = async () => {
    for (let i = pokemonGeneration[0]; i <= pokemonGeneration[1]; i++) {
       await getPokemon(i)
    }
}

// ? LLAMADA A LA API  ( FETCH )

    const getPokemons = async (id, modal) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    //.then (response => response.json())
    //.then (pokemon => console.log(pokemon)) ó  (data => console.log(data)) (data => console.log(data.name))
    //.catch (error => console.log(error))
    try {
            const rest = await fetch(url)
            if(!rest.ok){
                alert('POKEMON NOT FOUND, PLEASE TRY AGAIN')
                // throw Error ('POKEMON NOT FOUND, PLEASE TRY AGAIN')
            }
            const pokemon = await rest.json()
            createPokemon(pokemon, modal)

        }catch(error) {
            console.error('Error', error.message)

            if(modal){
                // mostrar un mensaje de error en el modal
                showModal('POKEMON NOT FOUND, PLEASE TRY AGAIN')
            }else{
                // mostrar un mensaje de errror en la consola 
                console.log('POKEMON NOT FOUND, PLEASE TRY AGAIN')
            }
        }
    }

/* pintar la card de los pokemons */ 

const color = {
    fire: '#FFA05D',
	grass: '#8FD594',
	electric: '#FFE43B',
	water: '#7E97C0',
	ground: '#CAAC4D',
	rock: '#90642D',
	poison: '#9D5B9B',
	bug: '#EAFD71',
	dragon: '#97b3e6',
	psychic: '#FF96B5',
	flying: '#CDCDCD',
	fighting: '#FF5D5D',
	normal: '#FFFFFF'
}

const main_types = Object.keys(color)

function createPokemon (pokemon, modal) {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    // Este método es útil para encontrar elementos en una cadena y es diferente al método search(), 
    // ya que indexOf() es más rápido y adecuado para subcadenas simples, 
    //mientras que search() permite usar expresiones regulares para patrones más complejos
    const poke_types = pokemon.types.map( type => type.type.name )
    const type = main_types.find(type => poke_types.indexOf(type))
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const color = colors[type]
    pokemonEL.style.backgroundColor = color
    
}