const { Schema, model } = require('mongoose');

// Modelo para base de datos de las especialidades
const specialtySchema = Schema ({
    type: {
        type: String,
        required: ['true', 'Specialty is required for the doctor']
    }
})

module.exports = model('Specialty', specialtySchema);