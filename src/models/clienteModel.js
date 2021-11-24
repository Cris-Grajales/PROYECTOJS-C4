const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const clienteSchema = mongoose.Schema({
    Cedula: Number,//se agrega el nombre del input de la web del formulario
    Nombre : String,
    Direccion : String,
    Telefono : Number,
    Email : String
},{versionKey: false});


module.exports= mongoose.model("cliente", clienteSchema); // nombre de la coleccion de la base de datos "cliente" y el formato o modelo