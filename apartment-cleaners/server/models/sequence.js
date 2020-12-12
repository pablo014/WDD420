const mongoose = require('mongoose')

sequenceSchema = mongoose.Schema({
    maxChoreId: {type: String}
})

module.exports = mongoose.model('Sequence', sequenceSchema)