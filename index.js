const express = require('express');
const app=express();
const bodyParser = require('body-parser');

//especificamos el subdirectorio donde se encuentran las páginas estáticas
app.use(express.static(__dirname + '/public'));

//extended: false significa que parsea solo string (no archivos de imagenes por ejemplo)
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
        
		let password=req.body.password;
		let usuario=req.body.username;
		if(usuario=="admininicial" && password=="admin123456") {
			res.send("Holis admin");
		}
		else {
			res.redirect('/index.html');
		}
})

var server=app.listen(8081, () => {
    console.log('Servidor web iniciado');
  });
  
