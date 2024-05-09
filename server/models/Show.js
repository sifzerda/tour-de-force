const mongoose = require('mongoose');

const { Schema } = mongoose;

const showSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    required: true
  },

  venue: [{
    name: String
  }],

  price: {
    type: Number,
    required: true,
    min: 0.99
  },

});

//const Venue = mongoose.model('Venue', venueSchema);

const Show = mongoose.model('Show', showSchema);

module.exports = Show;






