const mongoose = require('mongoose')

documentSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    url: {type: String},
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
})

module.exports = mongoose.model('Document', documentSchema)