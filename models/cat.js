var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var catSchema = new Schema({
  name: String
});

var Cat = mongoose.model('Cat', catSchema);

// when we require this file, we get Cat
module.exports = Cat;