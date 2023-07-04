const { request, response } = require('express');

const Doctor = require('../models/doctor');
const { deleteAppointmentDoctor } = require('../helpers/db_validators');

// Maneja la creación de un nuevo doctor
const newDoctor = async (req = request, res = response) => {
    const { firstName, lastName, specialty, office, email } = req.body;

    try {
        const doctor = new Doctor({ firstName, lastName, specialty, office, email });
        await doctor.save();
        
        res.render('newDoctor', { 
            description: 'You have been created a new Doctor with the following attributes: ',
            firstName,
            lastName,
            specialty,
            office,
            email,
        });
    } catch (error) {
        console.log(error);
    }
    
}

// Maneja la solicitud de mostrar todos los doctores
const getDoctor = async (req = request, res = response) => {
    
    try {
        const doctors = await Doctor.find();
        res.render('doctors', {
            doctors
        }); 
    } catch (error) {
        console.log(error);
    }

}

// Muestra solamente un doctor, el solicitado por el id
const getOnlyOneDoctor = async (req = request, res = response) => {
    const doctorId = req.params.id;
    const body = req.query.type;
    
    if(body == 'delete') {
        try {
            const doctor = await Doctor.findById( doctorId );
    
            res.render('onlyOneDoctor', {
                msg: `Do you want to delete the doctor ${doctor.firstName} ${doctor.lastName}?`,
                type: 'delete',
                doctor: doctor,
                error: false
            });
        } catch (err) {
            console.log(err);
            res.render('onlyOneDoctor', {
                msg: `The doctor with the id ${doctorId} does not exist`,
                error: true
            });
        }
    } else if(body == 'edit') {
        try {
            const doctor = await Doctor.findById( doctorId );
    
            res.render('onlyOneDoctor', {
                msg: `You are going to edit the doctor ${doctor.firstName} ${doctor.lastName}`,
                type: 'edit',
                doctor: doctor,
                error: false
            });
        } catch (err) {
            console.log(err);
            res.render('onlyOneDoctor', {
                msg: `The doctor with the id ${doctorId} does not exist`,
                error: true
            });
        }
    }
}

// Elimina un doctor
const deleteDoctor = async (req = request, res = response) => {
    const doctorId = req.params.id;

    try {
        const doctor = await Doctor.findByIdAndDelete({ _id: doctorId });
        const doctorName = doctor.firstName + ' ' + doctor.lastName
    
        deleteAppointmentDoctor(doctor.specialty);

        if(!doctor) { 
            res.json({ 
                element: doctorName,
                status: false,
            });
        } else { 
            res.json({
                element: doctorName,
                status: true,
            });
        }
    } catch (error) {
        res.json({ 
            element: error,
            status: false
        });
    }
}

// Edita un doctor
const updateDoctor = async (req = request, res = response) => {
    const doctorId = req.params.id;
    const body = req.body;
    
    try {
        const doctor = await Doctor.findByIdAndUpdate( doctorId, body );
        res.json({ 
            element: `Doctor ${doctor.firstName} ${doctor.lastName} has been modified`,
            status: true
        });
    } catch (error) {
        res.json({ 
            element: error,
            status: false
        });
    }
}

module.exports = {
    newDoctor,
    getDoctor,
    getOnlyOneDoctor,
    deleteDoctor,
    updateDoctor,
}
