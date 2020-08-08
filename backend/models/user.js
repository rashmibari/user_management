var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    full_name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

// Exporting  the model
module.exports = mongoose.model('User', UserSchema);