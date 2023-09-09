const mongoose = require("mongoose");
//Define a schema
const Schema = mongoose.Schema;
const TicketSchema = new Schema({
  ticket: {
    type: Number,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model('Ticket', TicketSchema)
