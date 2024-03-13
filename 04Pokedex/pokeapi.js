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

let arrowRight

let arrowLeft