let usuariosRegistrados = [];

document.addEventListener("DOMContentLoaded",()=>{
    cargarUsuarios();
});

async function cargarUsuarios(){
    try{
        const url = "https://jsonplaceholder.typicode.com/users";
        const archivo = await fetch(url);
        if(!archivo.ok){
            throw new Error("Error en la petición: ${archivo.status}");
        }
        const usuarios = await archivo.json();
        console.log(usuarios);
        usuarios.forEach(element => {
            let nuevoUsuario = new Usuario(element.name,element.username,element.email,element.phone,element.address["city"],element.company["name"],element.id);
            usuariosRegistrados.push(nuevoUsuario);
        });
        renderizarTabla();
    }catch(error){
        console.error("Hubo un problema al cargar los usuarios", error);
    }
}

function renderizarTabla(){
    const tabla = document.getElementById("tabla-informacion");
    tabla.innerHTML = '';
    const titulos = document.createElement("thead");
    titulos.innerHTML = `
        <thead>
            <th class="text-info bg-dark">ID</th>
            <th class="text-info bg-dark">Nombre</th>
            <th class="text-info bg-dark">Usuario</th>
            <th class="text-info bg-dark">Email</th>
            <th class="text-info bg-dark">Teléfono</th>
            <th class="text-info bg-dark">Ciudad</th>
            <th class="text-info bg-dark">Empresa</th>
            <th class="text-info bg-dark">Acciones</th>
        </thead>
    `;
    tabla.appendChild(titulos);
    //console.log(usuariosRegistrados);
    usuariosRegistrados.forEach(element => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${element._id}</td>
            <td>${element._nombre}</td>
            <td>${element._usuario}</td>
            <td>${element._email}</td>
            <td>${element._telefono}</td>
            <td>${element._ciudad}</td>
            <td>${element._empresa}</td>
            <td>
                <button class="btn-editar" data-id="${element._id}">Editar</button>
                <button class="btn-eliminar" data-id="${element._id}">Eliminar</button>
            </td>`;
        tabla.appendChild(fila);
    });
}