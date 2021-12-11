const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const ventaSchema = mongoose.Schema({
    Cedula: Number,//se agrega el nombre del input de la web del formulario
    Productos :{Nombre_producto: String,Cantidad:Number, Valor_unidad: Number},
    ValorTotal : Number,
},{versionKey: false});


module.exports= mongoose.model("venta", ventaSchema); // nombre de la coleccion de la base de datos "cliente" y el formato o modelo