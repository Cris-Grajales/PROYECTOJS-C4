const express= require('express');
const path=require('path');
const morgan=require('morgan');
const mongoose=require('mongoose')

const app= express();

//conectando la base de datos
mongoose.connect("mongodb+srv://admin:admin@cluster0.9rut7.mongodb.net/TiendaDB?retryWrites=true&w=majority")
.then(db=>console.log('mongoose conectada'))
.catch(err=>console.log(err))

//****************
// importar rutas
//****************
const indexRoutes=require('./routes/index');

//****************
// configuraciones
//**************** 
app.set('port',process.env.PORT ||5000);
app.set("views", path.join(__dirname, "/views"));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, "/public")))
//****************
//middlewares
//****************

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
//****************
//rutas
//****************


app.use('/',indexRoutes);


//iniciando servidos

app.listen(app.get('port'),()=>{
    console.log(`servidor puerto ${ app.get('port')}` )
})  