class Tarea{
    _id;
    _texto;
    _completada;

    constructor(texto,completada,id = Tarea.retornarNuevoID()){
        this._id = id;
        this._texto = texto;
        this._completada = completada;
    }

    get id(){
        return this._id;
    }

    set id(valor){
        if(typeof(valor) == "number"){
            this._id = valor;
        }else{
            return "Valor inválido";
        }
    }

    get texto(){
        return this._texto;
    }

    set texto(valor){
        if(typeof(valor) == "string"){
            this._texto = valor;
        }else{
            return "El valor pasado no es bool";
        }
    }

    get completada(){
        return this._completada;
    }

    set completada(valor){
        if(typeof(valor) == "boolean"){
            this._completada = valor;
        }else{
            return "El valor pasado no es bool";
        }
    }

    static retornarNuevoID(){
        const tareasParsed = JSON.parse(localStorage.getItem('tareas'));
        let ultimoElementoTareasParsed = tareasParsed.pop();
        return ultimoElementoTareasParsed["id"] + 1;
    }

    static guardarEnLocalStorage(tareas){
        let tareasJson = [];
        tareas.forEach(tarea =>{
            let tareaJson = {"id":tarea._id,"texto":tarea._texto,"completada":tarea._completada};
            tareasJson.push(tareaJson)
        });
        localStorage.setItem('tareas',JSON.stringify(tareasJson));
    }

    static eliminarTarea(id,tareas){
        let indice = tareas.findIndex((tarea) => tarea._id == id);
        if(indice != -1){
            tareas.splice(indice,1);
            return tareas;
        }else{
            console.log("No se ha encontrado el valor de index");
            return false;
        }
    }

    static actualizarTarea(id,tareas,completada){
        tareas.forEach(tarea => {
            if(tarea._id == id){
                tarea.completada = completada;
            }
        });
        return tareas;
    }
}