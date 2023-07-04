const { request, response } = require('express');

const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');

// Renderiza la página que solicita la busqueda de citas por documento de usuario
// o el filtrado de citas por especialidad
const searchFilter = async (req = request, res = response) => {
    
    const doctors = await Doctor.find().exec();
    let specialties = [];
    doctors.forEach((doctor) => {
        specialties.push(doctor.specialty);
    })
    
    res.render('search', {
        specialties: specialties
    });
}

// Realiza la busqueda de citas por medio del documento del usuario
const search = async (req = request, res = response) => {
    
    const idNumberUser = req.query.idNumber;
    
    try {
        const appoinmentForUser = await Appointment.find({ idNumberUser: idNumberUser });
                
        if(appoinmentForUser.length > 0) {
            res.render('userAppointment', {
                element: appoinmentForUser,
                selector: idNumberUser,
                status: true,
                type: 'search'
            });
        } else {
            res.render('userAppointment', {
                element: `User with identification number ${idNumberUser} does not have any appoinment associated`,
                selector: idNumberUser,
                status: false,
                type: 'search'
            });
        }
    } catch (error) {
        res.render('userAppointment', {
            element: error,
            status: false,
            type: 'search'
        })
    }
    
}

// Realiza el filtrado de citas por medio de las especialidades
const filter = async (req = request, res = response) => {

    const specialty = req.query.specialty;
    
    try {
        const appoinmentForSpecialty = await Appointment.find({ specialty: specialty });
                
        if(appoinmentForSpecialty.length > 0) {
            res.render('userAppointment', {
                element: appoinmentForSpecialty,
                selector: specialty,
                status: true,
                type: 'filter'
            });
        } else {
            res.render('userAppointment', {
                element: `Specialty ${specialty} does not have any appoinment associated`,
                selector: specialty,
                status: false,
                type: 'filter'
            });
        }
    } catch (error) {
        res.render('userAppointment', {
            element: error,
            status: false,
            type: 'filter'
        })
    }
}

module.exports = { 
    searchFilter,
    search,
    filter
};