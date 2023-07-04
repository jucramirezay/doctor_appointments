const { Schema, model } = require('mongoose');

// Modelo para base de datos del usuario
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'you must write your first name'],
    },
    lastName: {
        type: String,
        required: [true, 'you must write your last name'],
    },
    idNumber: {
        type: Number,
        required: [true, 'you must write your identification number'],
        unique: true,
    },
    age: {
        type: Number,
        required: [true, 'you must write your age'],
    },
    phoneNumber: {
        type: Number,
        required: [true, 'you must write your phone number'],
    }

});

module.exports = model('User', UserSchema); 