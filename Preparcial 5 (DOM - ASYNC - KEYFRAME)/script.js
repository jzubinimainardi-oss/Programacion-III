let imagenesRegistradas = [];

document.addEventListener("DOMContentLoaded",()=>{
    cargarImagenes();
    administrarBotones();
});

async function cargarImagenes(){
    try{
        const archivo = await fetch("imagenes.json");
        if(!archivo.ok){
            throw new Error("Error en la petición: ${archivo.status}");
        }
        const imagenes = await archivo.json();
        renderizarImagenes(imagenes);
        imagenes.forEach(element => {
            let nuevaImagen = new Imagen(element.titulo,element.url,element.id);
            console.log(nuevaImagen);
            imagenesRegistradas.push(nuevaImagen);
        });
    }catch(error){
        console.error("Hubo un problema al cargar las imagenes", error);
    }
}

function renderizarImagenes(imagenes){
    const contenedorImagenes = document.getElementById("contenedorImagenes");
    contenedorImagenes.innerHTML = ``;
    imagenes.forEach(imagen => {
        let nuevaImagen = document.createElement("div");
        nuevaImagen.innerHTML = `<div class="contenedorFotoIndividual"><img src=${imagen.url} id='${imagen.id}'><h2>${imagen.titulo}<button type='submit' id='btnBorrar${imagen.id}'value='${imagen.id}''>🗑️</h2></button></div>`;
        contenedorImagenes.appendChild(nuevaImagen);
    });
}

function administrarBotones(){
    document.addEventListener("click",(e)=>{
        if(e.target.type == "submit"){
            const btnBorrarSeleccionado = document.getElementById(e.target.id);
            const elementoPadreBoton = btnBorrarSeleccionado.parentElement;
            (elementoPadreBoton.parentElement).classList.add("desvanecimiento");
            setTimeout(() =>{
                const id = e.target.value;
                imagenesRegistradas = Imagen.eliminarImagen(id,imagenesRegistradas);
                renderizarImagenes(imagenesRegistradas);
            },5000);
        }
    })
}

