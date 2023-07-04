const { Schema, model } = require('mongoose');

// Modelo para base de datos del doctor
const DoctorSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'you must write your first name'],
    },
    lastName: {
        type: String,
        required: [true, 'you must write your last name'],
    },
    specialty: {
        type: String,
        required: [true, 'you must write your specialty'],
    },
    office: {
        type: Number,
        required: [true, 'you must write your office number'],
    },
    email: {
        type: String,
        required: [true, 'you must write your email address'],
    },
});

module.exports = model('Doctor', DoctorSchema);