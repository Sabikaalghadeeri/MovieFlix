const mongoose = require ('mongoose')

const Schema = mongoose.Schema
//  Creating our List Schema
const ListModel = new Schema({
    title: {type: String, required: true},
    genre: {type: String, required: true},
    content: {type: Array},
    type: {type: String, required: true},
    // duration: {type: String, required: true},
    // agePG: {type: String, required: true},
    // cast: {type: String, required: true},
    // year: {type: String, required: true},
    // description: {type: String, required: true},
    
},{
    timestamps: true
})
// Storing pur Schema as a model
const List = mongoose.model('MyList', ListModel)
// Exporting our Model
module.exports = List