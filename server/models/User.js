const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Order = require('./Order');



// sub-document schema for venues
const ticketSchema = new Schema({
  show: {
    type: Schema.Types.ObjectId,
    ref: 'Show.name',
    required: true
},
venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show.venue',
    required: true
},
time: {
    type: Date,
    ref: 'Show.venue.time',
    required: true
},
price: {
    type: Number,
    ref: 'Show.price',
    required: true,
},
user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
quantity: {
    type: Number,
    min: 1,
    default: 1
},
purchased: {
    type: Date,
    default: Date.now
},

});






const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  orders: [Order.schema]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
