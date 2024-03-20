import arregloJedis from "./data/schema.js";

/*  RANGOS  

    MAESTRO DE LA ORDEN: 5
    MAESTRO JEDI: 4
    CABALLERO JEDI: 3
    PADAWAN: 2
    INICIANDO EL CAMINO JEDI: 1
*/

const setRole = (jedi,role) => {
    const roles = {
        5: "Maestro de la Orden",
        4: "Maestro Jedi",
        3: "Caballero Jedi",
        2: "Padawan",
        1: "Iniciando el camino Jedi"
    }

    const validRole = roles[role]

    if(validRole){
        //si el role es válido, se asigna al jedi
        return{
            ...jedi,
            role: validRole
        }
    }else{
          // si el rol no es válido, se asigna "Desconocido" al jedi  
          return {
            ...jedi,
            role: "Desconocido"
          } 
      }
    }

const handleFormSubmit = (event) => {
    event.preventDefault() // evitar que se envíe el formulario automaticamente 

    // Almacenar la información del formulario en un objeto de javascript 
    const character = {
        name: form.name.value,
        age: Number(form.age.value),
        team: form.team.value
    }

    // validar que el nombre del jedi no está repetido
    if(validCharacter (character)){
        // si los datos del personaje son validos, se agrega al arreglo de jedis y se actualiza la tabla
        arregloJedis.push(setRole(character, 1))
        updateJediList()
        // si lo queremos ver por consola
        console.log(arregloJedis)
        console.dir(arregloJedis)
        console.table(arregloJedis)
    }else {
        // si hay datos vacios, se muestra un alerta y se detiene la ejecución del evento
        alert("TIENES UN DATO VACIO, POR FAVOR VERIFICAR EL FORMULARIO")
        event.stopPropagation() // detengo la ejecución del evento
    }
}

const handleChangeRole = () => {
    // solicitar el nombre
    // guardar el indice con un click en la fila del crud 
    const index = prompt('INGRESE EL INDICE DEL JEDI:', '')
    // que pasa si me da el nombre
    const jedi = arregloJedis[index]
        if(jedi){
        // utilizamos un modal de bootstrap
        const newRole = prompt('Ingrese el nuevo rol:' , '')
            if(newRole >= 1 && newRole <= 5){
            // si el nuevo rol es válido, se actualiza el rol del personaje en el arreglo de jedis
            arregloJedis[index] = setRole(jedi, Number(newRole))
                updateJediList()
                console.log(arregloJedis)
            }else{
                alert('Rol invalido')
            }
        }else{
            alert('Indice inválido')
        }
    }


const handleEditJedi = (event) => {
      // En JavaScript, la expresión event.target.dataset.index se utiliza para acceder al valor del 
        // atributo data-index de un elemento HTML que ha desencadenado un evento. 
        const index = event.target.dataset.index
        const jedi = arregloJedis[index]

         //UTILIZAR FORMULARIO EN UNA MODAL DE BOOTSTRAP
         const newName = prompt ('Ingrese el nuevo nombre', jedi.name)
         const newAge = prompt ('Ingrese la nueva edad:', jedi.age)
         const newTeam = prompt ('Ingrese el nuevo equipo:', jedi.team)
 
 
         if(newName && newAge && newTeam){
             // si se proporcionan nuevos valores válidos, se actualiza el jedi en el arreglo de jedis
             arregloJedis[index] = {
                ...jedi,
                name: newName,
                age: Number(newAge),
                team: newTeam
             }
             updateJediList()
         }
     }

    const handleDeleteJedi = (event) => {
        // En JavaScript, la expresión event.target.dataset.index se utiliza para acceder al valor del 
        // atributo data-index de un elemento HTML que ha desencadenado un evento. 
        const index = event.target.dataset.index;
        arregloJedis.splice(index, 1);
    
        updateJediList();
        console.log(arregloJedis);
    }

    const handleSortJedis = () => {
       // Implementar el algoritmo de ordenamiento por selección aquí
       selectionSort(arregloJedis);
    
       // Actualizar la lista de jedis en el DOM
       updateJediList();
    }

    const handleFilterJedis = () => {
        const filterValue = jediNameFilter.value.toLowerCase().trim()
        // La función trim() en JavaScript se utiliza para eliminar los espacios en blanco al principio y al final 
        // de una cadena de texto. Esta función es muy útil para limpiar y normalizar cadenas de texto.
        const filteredJedis = arregloJedis.filter((jedi) => 
         jedi.name.toLowerCase().includes(filterValue))

         //actualizar la lista de jedis filtrados en el dom
         updateJediList(filteredJedis)
    }

    // INTERCAMBIAR LOS ELEMENTOS DE POSICIÓN EN EL ARREGLO
    // [a,b] = [b,a]
    // -> ejemplo de stackoverflow: https://stackoverflow.com/questions/16201656/how-to-swap-two-variables-in-javascript

    const selectionSort = (array) => {
        const length = array.length

     // ALGORITMO DE ORDENAMIENTO POR SELECCIÓN 
    for (let i = 0; i < length - 1; i++) {
        let minIndex = i 
    
        for ( let j = i + 1 ; j < length; j++){
            if(array[j].name < array[minIndex].name){
                minIndex = j
            }
        }

        if (minIndex !== i){
            swap(array, i, minIndex)
        }
     }

    }

    const swap = (array, index1, index2) => {
        // INTERCAMBIAR ELEMENTOS DE POSICIÓN EN EL ARREGLO 
        const temp = array[index1]
        array [index1]  = array[index2]
        array[index2] = temp //array[index1]
    }

    // FUNCIÓN QUE CREA EL CRUD (Create, Read, Upadte/Patch , Delete)
    const updateJediList = (filteredJedis = arregloJedis) => {
        const jediList = document.querySelector('#jediList')
        // limpiar el contenido de la tabla
        jediList.innerHTML = ''  //LIMPIAR EL CONTENIDO EXISTENTE 

       filteredJedis.forEach((jedi, index )=>{
        const row = `
        <tr>
        <td>${jedi.name}</td>
        <td>${jedi.age}</td>
        <td>${jedi.team}</td>
        <td>${jedi.role}</td>
        <td>
        <button type="button" class="btn btn-outline-warning editBtn" data-index="${index}">Editar</button>
        <button type="button" class="btn btn-outline-danger deleteBtn" data-index="${index}">Eliminar</button>
        </td>
        </tr>   
        `
        jediList.innerHTML += row
     })
    

        // agregar eventos a los botones de editar y eliminar 
     const editButton = document.querySelectorAll ('.editBtn')
     const deleteButton = document.querySelectorAll ('.deleteBtn')

     editButton.forEach((button) =>{
        button.addEventListener('click', handleEditJedi)
     })

     deleteButton.forEach((button) =>{
        button.addEventListener('click', handleDeleteJedi)
     })
    }

    
  //VALIDAR QUE NO HAY PROPIEDADES VACIAS  // VAMOS A RECIBIR UN TRUE O FALSE (BOOLEANO)
  const validCharacter = ({ name = "", age = 0, team=""}) => name !== "" && age !== 0 && team !== ""
  
  //EJECUCION 
  updateJediList()

  // OBTENIENDO EL FORMULARIO DESDE EL DOM (DESDE EL HTML)  SELECCIONAR ELEMENTO 
  const form = document.querySelector('#characterRegistry')
  //EVENTO                                                  MANIPULAR ELEMENTO 
  form.addEventListener('submit', handleFormSubmit)

  // AGREGAR EVENTO AL BOTÓN DE CAMBIAR ROL    SELECCIONAR ELEMENTO 
  const changeRoleBtn = document.querySelector('#changeRoleBtn')
  //EVENTO                                                  MANIPULAR ELEMENTO 
  changeRoleBtn.addEventListener('click', handleChangeRole)

  //AGREGAR UN EVENTO AL BOTÓN DE ORDENAR
  const sortButton = document.querySelector('#orderButton')
  sortButton.addEventListener('click', handleSortJedis )

 //AGREGAR EVENTO AL INPUT DE ENTRADA DEL FILTRADO POR NOMBRE 
 const jediNameFilter = document.querySelector('#jediNameFilter')
 jediNameFilter.addEventListener('click', handleFilterJedis)