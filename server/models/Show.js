const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const dateFormat = require('../utils/dateFormat');

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

// sub-document for thoughts 
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  thoughtAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
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
    // References the Venue model (which references time)
  venue: { 
    type: [venueSchema], 
    required: true 
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  // References the Thought model (which references comments)
  thoughts: [thoughtSchema]  // thoughts is an array of thoughtSchema
});

//const Venue = mongoose.model('Venue', venueSchema);

const Show = mongoose.model('Show', showSchema);

module.exports = Show;






