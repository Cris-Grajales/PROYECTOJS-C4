const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

const fileUpload = require('express-fileupload')
var url = "mongodb://localhost:27017/TiendaDB";

//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/public'));

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
        
		let password=req.body.password;
		let usuario=req.body.username;
		if(usuario=="admininicial" && password=="admin123456") {
			res.redirect('MenuPrincipal.html');
		}
		else {
			alert('DATOS INVALIDOS');
			location.reload();
			
		
		}
})


var dbConn;
mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log('B Connected!');
    dbConn = client.db();
}).catch(err => {
    console.log("DB Connection Error: ${err.message}");
});
app.use(fileUpload())
app.post('/cargar',(req,res) => {
    let EDFile = req.files.file
    EDFile.mv(`./productos.csv`,err => {
        if(err) return res.status(500).send({ message : err })

		

        return res.status(200).send({ message : 'ARCHIVO SUBIDO' })
    })

	// CSV file name
	const fileName = "productos.csv";
	var arrayToInsert = [];
   csvtojson().fromFile(fileName).then(source => {
	// Fetching the all data from each row
	for (var i = 0; i < source.length; i++) {
	   var oneRow = {
		   codigo_producto: source[i]["codigo_producto"],
		   nombre_producto: source[i]["nombre_producto"],
		   nitproveedor: source[i]["nitproveedor"],
		   precio_compra: source[i]["precio_compra"],
		   iva_compra: source[i]["iva_compra"],
		   precio_venta: source[i]["precio_venta"]
	   };
	   arrayToInsert.push(oneRow);
   }
   //inserting into the table 
   var collectionName = 'productos';
   var collection = dbConn.collection(collectionName);

   
   collection.insertMany(arrayToInsert, (err, result) => {
	   if (err) console.log(err);
	   if(result){
		   console.log("Import CSV into database successfully.");
	   }
   });
});
})









var server=app.listen(8081, () => {
    console.log('Servidor web iniciado');
  });

