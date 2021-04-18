const mongoose = require('../database')

const animeSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    number:{
        type: Intl,
        required:false,
        unique: true
    },
    description:{
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const anime = mongoose.model('anime', animeSchema);
module.exports = anime