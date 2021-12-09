const express=require('express');

var app = express();
const router=express.Router();
const bodyParser = require('body-parser');
const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

const Task= require('../models/clienteModel');

const fileUpload = require('express-fileupload')
var url = "mongodb+srv://admin:admin@cluster0.9rut7.mongodb.net/TiendaDB?retryWrites=true&w=majority";
 

router.get('/', (req, res)=>{
    res.render('index');
}) 
router.get('/Productos', (req, res)=>{
    res.render('Productos');
}) 
router.get('/Clientes', async (req, res)=>{
    const tasks= await Task.find();
   console.log(tasks);
   res.render('Clientes',{ 
      tasks
   });
}) 


router.post('/login', (req, res) => {
        
    let password=req.body.password;
    let usuario=req.body.username;
    if(usuario=="admininicial" && password=="admin123456") {
        res.render('MenuPrincipal');
    }
    else {
        res.render('index', { message: "DATOS INVALIDOS" });
        
        
    
    }
})


var dbConn;
mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
}).catch(err => {
    console.log("DB Connection Error: ${err.message}");
});
router.use(fileUpload())

router.post('/cargar',(req,res) => {
    let EDFile = req.files.file
    EDFile.mv(`src/productos.csv`,err => {
        if(err) res.render('Productos', { message2: "ERROR AL SUBIR EL ARCHIVO" })


        return res.render('Productos', { message: "Archivo Subido exitosamente" });
    })

	// CSV file name
	const fileName = `src/productos.csv`; 
	var arrayToInsert = [];
   csvtojson().fromFile(fileName).then(source => {
	// Fetching the all data from each row
	for (var i = 0; i < source.length; i++) {
	   var oneRow = {
		   title: source[i]["title"],
		   description: source[i]["description"],
		   price: source[i]["price"],
		   pathImage: source[i]["pathImage"],
		   
	   };
	   arrayToInsert.push(oneRow);
   }
   //inserting into the table 
   var collectionName = 'products';
   var collection = dbConn.collection(collectionName);

   
   collection.insertMany(arrayToInsert, (err, result) => {
	   if (err) console.log(err);
	   if(result){
		   console.log("Import CSV into database successfully.");
	   }
   });
});
})


router.post('/add', async (req, res) =>{
    const task= new Task(req.body);
    await task.save();
    res.redirect('Clientes');
 });
 
 
 //Delete
 router.get('/delete/:id', async (req, res) => {
    const { id }= req.params;
    await Task.remove({_id: id});
    res.redirect('/');
 });
 
 
 //Edit
 router.get('/edit/:id', async (req, res) => {
     const { id }= req.params;
     const task= await Task.findById(id);
     res.render('editCliente', {
        task
     });
  });
  router.post('/edit/:id', async (req, res) => {
     const { id }= req.params;
     await Task.update({_id: id}, req.body);
     res.redirect('/');
  });
 


module.exports =router;

