let tareasRegitradas = [];

document.addEventListener("DOMContentLoaded",()=>{
    cargarTareas();
    administrarBotones();
});

async function cargarTareas(){
    try{
        const archivo = await fetch("tareas.json");
        if(!archivo.ok){
            throw new Error("Error en la petición: ${archivo.status}");
        }
        const tareas = await archivo.json();
        renderizarTareas(tareas);
        guardarTareas(tareas);
        tareas.forEach(element => {
            let nuevaTarea = new Tarea(element.texto,element.completada,element.id);
            tareasRegitradas.push(nuevaTarea);
        });
    }catch(error){
        console.error("Hubo un problema al cargar las tareas", error);
    }
}

function guardarTareas(tareas){
    const tareasArray = [];
    tareas.forEach(element =>{
        let nuevaTarea = new Tarea(element["texto"],element["completada"],element["id"]);
        tareasArray.push(nuevaTarea);
    })
    Tarea.guardarEnLocalStorage(tareasArray);
}

function renderizarTareas(tareas){
    const listadoTareas = document.getElementById("listadoTareas");
    listadoTareas.innerHTML = ``;
    tareas.forEach(element => {
        let nuevaTarea = document.createElement("li");
        nuevaTarea.innerHTML = `<input type='checkbox' id='checkTarea' value='${element.id}'>` + element.texto + `<button type='submit' id='btnBorrar' value='${element.id}'>🗑️</button>`;
        listadoTareas.appendChild(nuevaTarea);
    });
}

function agregarTarea(nuevoObjetoTarea){
    const listadoTareas = document.getElementById("listadoTareas");
    const inputTexto = document.getElementById("inputTextData");
    let nuevaTarea = document.createElement("li");
    nuevaTarea.innerHTML = `<input type='checkbox' value='${nuevoObjetoTarea.id}' id='checkTarea'>` + nuevoObjetoTarea.texto + `<button type='submit' id='btnBorrar' value='${nuevoObjetoTarea.id}'>🗑️</button>`;
    listadoTareas.appendChild(nuevaTarea);
    inputTexto.value = "";
}

function administrarBotones(){
    const botonGuardar = document.getElementById("botonGuardar");
    const lista = document.getElementById("listadoTareas");
    document.addEventListener("click",(e)=>{
        if(e.target.id == "btnGuardar"){
            const inputTexto = document.getElementById("inputTextData");
            if(inputTexto.value != ""){
                let nuevaTarea = new Tarea(inputTexto.value,false);
                tareasRegitradas.push(nuevaTarea);
                agregarTarea(nuevaTarea);
                Tarea.guardarEnLocalStorage(tareasRegitradas);
            }
        }
        if(e.target.id == "btnBorrar"){
            const btnBorrarSeleccionado = document.getElementById("btnBorrar");
            let id = e.target.value;
            tareasRegitradas = Tarea.eliminarTarea(id,tareasRegitradas);
            renderizarTareas(tareasRegitradas);
        }
        if(e.target.type == "checkbox"){
            const idActualizar = e.target.value;
            const checkBox = document.querySelector(`input[type="checkbox"][value="${e.target.value}"`);
            const listaPadre = checkBox.parentElement;
            if(checkBox.checked){
                listaPadre.classList.add("completada");
                tareasRegitradas = Tarea.actualizarTarea(idActualizar,tareasRegitradas,true);
            }else{
                listaPadre.classList.remove("completada");
                tareasRegitradas = Tarea.actualizarTarea(idActualizar,tareasRegitradas,false);
            }
        }
    })
    document.addEventListener("keydown", (e)=>{
        if(e.key == "Enter"){
            const inputTexto = document.getElementById("inputTextData");
            if(inputTexto.value != ""){
                let nuevaTarea = new Tarea(inputTexto.value,false);
                tareasRegitradas.push(nuevaTarea);
                agregarTarea(nuevaTarea);
                Tarea.guardarEnLocalStorage(tareasRegitradas);
            }
        }
    });
}

