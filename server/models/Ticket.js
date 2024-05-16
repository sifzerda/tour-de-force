const mongoose = require('mongoose');

const { Schema } = mongoose;

// the ticket model will return all tickets that have been bought by users

const ticketSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  show: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Show'
    }
  ],
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
