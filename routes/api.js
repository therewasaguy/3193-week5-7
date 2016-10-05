var express = require('express');
var router = express.Router();

var Pet = require('../models/pet');

router.get('/', function(req, res) {
  res.json({
    status: 'ok'
  });
});

router.post('/pet', function(req, res, next) {
  var tags = undefined;
  if (req.body.tags) {
    tags = req.body.tags.split(',');
  }
  
  var pet = new Pet({
    name: req.body.name,
    slug: slugify(req.body.name),
    price: req.body.price,
    breed: req.body.breed,
    tags: tags
  });

  pet.save(function(err, data) {
    if (err) {
      console.log(err);
      res.status(500);
      return res.json({
        status: 'error',
        message: 'could not create pet',
        error: err
      });
    }
    
    return res.json({
      status: 'ok',
      message: 'created new pet',
      pet: data
    });
    
  
  });

});

router.get('/pet', function(req, res, next) {
  Pet.find({}, function(err, data) {
    if (err) {
      res.status(500);
      return res.json({
        status: 'error',
        message: 'could not get pets'
      });
    }

//    if (data.length === 0) {
//      return res.json({
//        status: 'no pets'
//      })
//    }
    
    return res.json(data);
  });
});

// via https://gist.github.com/mathewbyrne/1280286
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

module.exports = router;