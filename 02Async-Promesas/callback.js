//* EJEMPLO DE UN CALLBACK

// tenemos 2 funciones que devuelven un valor

function soyCien () {
    return 100
}


function soyDoscientos() {
    return 200
}
 
function soyTrescientos () {
    return 300
}

// tenemos una nueva función llamada sumaDosFunciones
// recibe 2 parametros que son mis 2 funciones (callbacks)
function sumaDosFunciones (functionOne, functionTwo, functionThree){
      const suma = functionOne() + functionTwo () + functionThree ()
      return suma // retorna un nuevo valor, en este caso suma
      console.log(suma)
} 

// Invocamos a sumaDosFunciones y le pasamos como parametro 2 funciones 
console.log(sumaDosFunciones(soyCien, soyDoscientos, soyTrescientos) )
