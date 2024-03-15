import arregloJedis from './data/schema.js';

/*  RANGOS  

    MAESTRO DE LA ORDEN: 5
    MAESTRO JEDI: 4
    CABALLERO JEDI: 3
    PADAWAN: 2
    INICIANDO EL CAMINO JEDI: 1
*/

const setRole = (jedi, role) => {
    const roles= {
        5: "Maestro de la orden",
        4: "Maestro Jedi",
        3: "Caballero Jedi",
        2: "Padawan",
        1: "Iniciando el camino Jedi"
    }
}

const validRole = roles[role]

if(validRole) {
    // si el role es válido, se asigna al jedi
    return {
        ...jedi,
        role: validRole
    }
}else {
    // si el rol no es válido, se asigna "Desconocido" al jedi
    return {
        ...jedi,
        role: "Desconocido"
    }
}

const handleFormSubmit = (event) => {
    e.preventDefault() // evitar que se envíe el formulario automaticamente 

    // Almacenar la información del formulario en un objeto de javascript 
    const character = {
        name: form.name.value,
        age: Number(form.age.value),
        team: form.team.value
    }

    // validar que el nombre del jedi no está repetido
    if (validCharacter (character)){
        // si los datos del personaje son validos, se agrega al arreglo de jedis y se actualiza la tabla
        arregloJedis.push(character)
        updateJediList()
        // si lo queremos ver por consola
        console.log(arregloJedis)
    }else {
        // si hay datos vacios, se muestra un alerta y se detiene la ejecución del evento
        alert("TIENES UN DATO VACIO, POR FAVOR VERIFICAR EL FORMULARIO")
        event.stopPropagation() // detengo la ejecución del evento
    }
}

const handleChangeRole = () => {
    // solicitar el nombre
    // guardar el indice con un click en la fila del crud 
    const index = prompt("INGRESA EL INDICE DEL JEDI: " , " ")
    // que pasa si me da el nombre
    const jedi = arregloJedis[index]
    if (jedi){
        // utilizamos un modal de bootstrap
        const newRole = prompt("INGRESA EL NUEVO ROL: " , " ")
        if(newRole >= 1 && newRole <= 5){
            // si el nuevo rol es válido, se actualiza el rol del personaje en el arreglo de jedis
            arregloJedis[index] = setRole(jedi, Number(newRole))
            updateJediList()
            console.log(arregloJedis)
        }else{
            alert('EL ROL NO ES VALIDO')
        }
    }else{
        alert('INDICE NO VALIDO')
    }
}

const handleEditJedi = () => {

    // utilizar formulario en una modal de bootstrap
    const newName = prompt("INGRESA EL NUEVO NOMBRE: " , jedi.name)

    const newAge = prompt("INGRESA LA NUEVA EDAD: " , jedi.age)
}