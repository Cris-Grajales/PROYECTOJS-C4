var Products;
exports.setModel = function (modelo) {
Products = modelo;

};

exports.create = function(req, res){
  res.render('save', {
    title: 'Carro De Compras',
    put: false,
    action: '/additem',
    products: new Products({
      title: '',
      description: '',
      price: '',
      pathImage: ''
    })
  });
};
exports.store = function(req, res){
  var products = new Products({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    pathImage: req.body.pathImage
  });
  products.save(function(error, documento){
    if(error){
      res.send('Error al intentar agregar el item.');
    }else{  
      res.redirect('/');
    }
  });
};
