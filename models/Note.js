const { Schema, model, Types} = require('mongoose')

const schema = new Schema({
    owner: {type: Types.ObjectId, ref: 'User'},
    text: {type: String},
    checked: false,
    important: false
})
module.exports = model('Note', schema)