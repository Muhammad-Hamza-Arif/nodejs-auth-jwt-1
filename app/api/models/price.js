const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
const PriceSchema = new Schema({
  price: {
    type: Number,
    default:"200"
  },
});
module.exports = mongoose.model('Price', PriceSchema)
