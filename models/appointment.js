const mongoose = require('mongoose')
const slugify = require('slugify')


const appointmentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    avaliability: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})


module.exports = mongoose.model('Appointment', appointmentSchema)