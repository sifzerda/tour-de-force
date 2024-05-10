const mongoose = require('mongoose');
const { Schema } = mongoose;

// each show contains multiple venues, each venue contains multiple sshow times

// sub-sub-document schema for time and venue combination
const timeSchema = new Schema({
  time: { 
    type: Date, 
    required: true 
  }, 
});

// sub-document schema for venues
const venueSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  }, 
  time: { 
    type: [timeSchema], 
    required: true 
  } 
});

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
  venue: { 
    type: [venueSchema], 
    required: true 
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },

});


//const Venue = mongoose.model('Venue', venueSchema);

const Show = mongoose.model('Show', showSchema);

module.exports = Show;






