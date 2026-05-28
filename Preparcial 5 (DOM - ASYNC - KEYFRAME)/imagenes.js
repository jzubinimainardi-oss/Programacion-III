class Imagen{
    _id;
    _titulo;
    _url;

    constructor(titulo,url,id){
        this._id = id;
        this._titulo = titulo;
        this._url = url;
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

    get titulo(){
        return this._titulo;
    }

    set titulo(valor){
        console.log(typeof(valor));
        if(typeof(valor) == "string"){
            this._titulo = valor;
        }else{
            return "El valor pasado no es string";
        }
    }

    get url(){
        return this._url;
    }

    set url(valor){
        if(typeof(valor) == "string"){
            this._url = valor;
        }else{
            return "El valor pasado no es string";
        }
    }

    static eliminarImagen(id,imagenes){
        console.log(imagenesRegistradas);
        let indice = imagenes.findIndex((imagen) => imagen._id == id);
        if(indice != -1){
            imagenes.splice(indice,1);
            return imagenes;
        }else{
            console.log("No se ha encontrado el valor de index");
            return false;
        }
    }
}