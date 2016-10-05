var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var petSchema = new Schema({
  name: {type: String, required: true},
  slug: {type: String, required: true, unique: true},
  animal: String,
  breed: String,
  tags: [String],
  price: Number,
  dateCreated: {type: Date, default: Date.now},
  imageUrl: String
});

var Pet = mongoose.model('Pet', petSchema);

// when we require this file, we get Pet model
module.exports = Pet;