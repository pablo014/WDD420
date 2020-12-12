const mongoose = require('mongoose')

choreSchema = mongoose.Schema({
    id: {type: String},
    name: {type: String, required: true},
    detail: {type: String},
    equipment: {type: String},
    jobNum: {type: String},
})

module.exports = mongoose.model('Chore', choreSchema)