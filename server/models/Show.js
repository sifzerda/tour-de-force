const mongoose = require('mongoose');
const { Schema, model } = mongoose;
//const dateFormat = require('../utils/dateFormat');
const dayjs = require('dayjs');

// each show contains multiple venues, each venue contains multiple show times

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
  },
  seatRows: {
    type: Number,
    required: true,
  },
  seatCols: {
    type: Number,
    required: true,
  },
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
  },
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
  ticketBannerImg: {
    type: String
  },
  ticketDesc: {
    type: String
  },
  image: {
    type: String
  },
  videoUrl: {
    type: String
  },
  // References the Venue model (which references time schema)
  venue: {
    type: [venueSchema],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
//  ticketQuant: {
//    type: Number,
//    min: 0,
//    default: 0
//  },
  // References the Thought model (which references comments)
  thoughts: [thoughtSchema]  // thoughts is an array of thoughtSchema
});

// Virtual property to format createdAt date
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return dayjs(this.createdAt).format('DD/MM/YYYY');
});

//const Venue = mongoose.model('Venue', venueSchema);

const Show = mongoose.model('Show', showSchema);

module.exports = Show;






