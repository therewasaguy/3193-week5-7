/**
     /pets routes
*/

var express = require('express');
var router = express.Router();

var path = require('path');

var multer = require('multer');
var uploadPath = path.join(__dirname, '../public/uploads');
var upload = multer({ dest: uploadPath});

var Pet = require('../models/pet');

router.get('/add', function(req, res) {
  res.render('new-pet');
});

router.post('/add', upload.single('image'), function(req, res) {
  var pet = new Pet({
    name: req.body.name,
    animal: req.body.animal,
    price: req.body.price,
    imageFilename: req.file.filename
  });
  
  pet.save(function(err, data) {
    if (err) {
      console.log(err);
      
      return res.redirect(303, '/pets');
    }
    
    return res.redirect(303, '/pets');
  });
  
});

router.get('/', function(req, res) {
  var query = {};
  if (req.query.animal) {
    query = {animal: req.query.animal};
  }
  Pet.find(query, function(err, data) {
    var pageData = {
      pets: data
    };
    res.render('pets', pageData);
  });

});

router.get('/:petSlug', function(req, res) {
    Pet.findOne({slug: req.params.petSlug}, function(err, data) {
    var pageData = {
      pets: [data]
    };
    res.render('pets', pageData);
  });
});
  
module.exports = router;