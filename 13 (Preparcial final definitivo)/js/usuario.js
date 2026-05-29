class Usuario{
    _id;
    _nombre;
    _usuario;
    _email;
    _telefono;
    _ciudad;
    _empresa;

    constructor(nombre,usuario,email,telefono,ciudad,empresa,id = Usuario.retornarNuevoID()){
        this._id = id;
        this._nombre = nombre;
        this._usuario = usuario;
        this._email = email;
        this._telefono = telefono;
        this._ciudad = ciudad;
        this._empresa = empresa;
    }

    get id(){
        return this._id;
    }   

    set id(value){
        if(typeof(value) == "numeric"){
            this._id = value;
            return true;
        }
        return false;
    }

    get nombre(){
        return this._nombre;
    }   

    set nombre(value){
        if(typeof(value) == "string"){
            this._nombre = value;
            return true;
        }
        return false;
    }

    get usuario(){
        return this._usuario;
    }   

    set usuario(value){
        if(typeof(value) == "string"){
            this._usuario = value;
            return true;
        }
        return false;
    }

    get usuario(){
        return this._usuario;
    }   

    set usuario(value){
        if(typeof(value) == "string"){
            this._usuario = value;
            return true;
        }
        return false;
    }

    get email(){
        return this._email;
    }   

    set email(value){
        if(typeof(value) == "string" && value.includes("@")){
            this._email = value;
            return true;
        }
        return false;
    }

    get telefono(){
        return this._telefono;
    }   

    set telefono(value){
        if(typeof(value) == "numeric"){
            this._telefono = value;
            return true;
        }
        return false;
    }

    get ciudad(){
        return this._ciudad;
    }   

    set ciudad(value){
        if(typeof(value) == "string"){
            this._ciudad = value;
            return true;
        }
        return false;
    }

    get empresa(){
        return this._empresa;
    }   

    set empresa(value){
        if(typeof(value) == "string"){
            this._empresa = value;
            return true;
        }
        return false;
    }

    static retornarNuevoID(){
        let ultimoElemento = usuariosRegistrados.pop();
        return ultimoElementoTareasParsed["id"] + 1;
    }
}