var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var URLSlugs = require('mongoose-url-slugs');

var petSchema = new Schema({
  name: {type: String, required: true},
  animal: Schema.Types.ObjectId,
  breed: String,
  tags: [String],
  price: Number,
  dateCreated: {type: Date, default: Date.now},
  imageFilename: String,
  comments: [Schema.Types.ObjectId]
});

petSchema.plugin(URLSlugs('name', {field: 'slug'}));

var Pet = mongoose.model('Pet', petSchema);

// when we require this file, we get Pet model
module.exports = Pet;