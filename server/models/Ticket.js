const mongoose = require('mongoose');

const { Schema } = mongoose;

const ticketSchema = new Schema({
    show: {
        type: Schema.Types.ObjectId,
        ref: 'Show',
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
    created: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
