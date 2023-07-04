const { Schema, model } = require('mongoose');

// Modelo para base de datos de la cita
const appointmentSchema = Schema ({
    idNumberUser: {
        type: Number,
        required: ['true', 'User Identification is required for the appointment']
    },
    specialty: {
        type: String,
        required: ['true', 'Specialty is required for the appointment']
    }
})

module.exports = model('Appointment', appointmentSchema);