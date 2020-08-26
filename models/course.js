const mongoose = require('mongoose')
const slugify = require('slugify')


const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    headline: {
        type: String,
    },
    desc1: {
        type: String,
        required: true
    },
    desc2: {
        type: String,
        required: true
    },

    desc3: {
        type: String,
        required: true
    },
    pic1: {
        type: String,
        required: true
    },
    pic2: {
        type: String,
        required: true
    },
    pic3: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug:{
        type: String,
        required: true,
        unique: true
    }
})

// run this func when saving to DB
courseSchema.pre('validate', function(next){
    // slugify generates human readable urls vs ids
    if(this.title){
        this.slug = slugify(this.title, {lower:true,
        strict: true})
    }
    next()
})
module.exports = mongoose.model('Course', courseSchema)