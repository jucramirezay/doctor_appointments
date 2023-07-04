const { request, response } = require('express');

const Appointment = require('../models/appointment');

// Maneja la creación de una nueva cita
const newAppointment = (req = request, res = response) => {
    const { idNumberUser, specialty } = req.body;

    try {
        const appointment = new Appointment({ idNumberUser, specialty });
        appointment.save();

        res.render('newAppointment', {
            description: 'You have been created a new Appointment with the following attributes: ',
            idNumberUser,
            specialty
        });
    } catch (error) {
        console.log(error);
    }
    
}

// Maneja la solicitud de visualización de las citas
const getAppointment = async (req = request, res = response) => {
    
    try {
        const appointments = await Appointment.find();
        res.render('appointments', {
            appointments
        });
    } catch (error) {
        console.log(error);
    }
    
}

// Muestra solamente una cita, la indicada por el id
const getOnlyOneAppointment = async (req = request, res = response) => {
    const appointmentId = req.params.id;
    const body = req.query.type;
   
    if(body == 'delete') {
        try {
            const appointment = await Appointment.findById( appointmentId );
    
            res.render('onlyOneAppointment', {
                msg: `Do you want to delete the appointment for ${appointment.idNumberUser} ${appointment.specialty}?`,
                type: 'delete',
                appointment: appointment,
                error: false,
            });
        } catch (err) {
            console.log(err);
            res.render('onlyOneAppointment', {
                msg: `The appointment with the id ${appointmentId} does not exist`,
                error: true,
            });
        }
    } else if(body == 'edit') {
        try {
            const appointment = await Appointment.findById( appointmentId );
    
            res.render('onlyOneAppointment', {
                msg: `You are going to edit the appointment for the user ${appointment.idNumberUser} and specialty ${appointment.specialty}`,
                type: 'edit',
                appointment: appointment,
                error: false
            });
        } catch (err) {
            console.log(err);
            res.render('onlyOneAppointment', {
                msg: `The appointment with the id ${appointmentId} does not exist`,
                error: true
            });
        }
    }
}

// Elimina la cita indicada por el id
const deleteAppointment = async (req = request, res = response) => {
    const appointmentId = req.params.id;

    try {
        const appointment = await Appointment.findByIdAndDelete({ _id: appointmentId });
        const appointmentInfo = `appoinment for user ${appointment.idNumberUser} and doctor specialty ${appointment.specialty}`;


        if(!appointment) { 
            res.json({ 
                element: appointmentInfo,
                status: false,
            });
        } else { 
            res.json({
                element: appointmentInfo,
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

// Actualiza la cita indicada por el id
const updateAppointment = async (req = request, res = response) => {
    const appointmentId = req.params.id;
    const body = req.body;
    
    try {
        const appointment = await Appointment.findByIdAndUpdate( appointmentId, body );
        res.json({ 
            element: `Appointment for user ${appointment.idNumberUser} and doctor specialty ${appointment.specialty} has been modified`,
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
    newAppointment,
    getAppointment,
    getOnlyOneAppointment,
    deleteAppointment,
    updateAppointment,
}
