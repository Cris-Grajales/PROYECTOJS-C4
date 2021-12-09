var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productos = require ('../routes/products');

var Productsschema = mongoose.Schema({
	title: {type: String, required: true},
	description: {type: String, required: true},
	price: {type: Number, required: true},
	pathImage: {type: String, required:true}
});
var ProductsModel = mongoose.model('Products', Productsschema);
productos.setModel (ProductsModel);

module.exports = mongoose.model('Products', Productsschema);