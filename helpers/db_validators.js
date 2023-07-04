const Doctor = require('../models/doctor');
const Specialty = require('../models/specialty');
const Appointment = require('../models/appointment');
const User = require('../models/User');


// Valida por medio de expresiones regulares si el nombre contiene algún número
const nameString = async (name = '') => {
    regExp = /[0-9]/;
    const res = await regExp.test(name);
    if(res) {
        throw new Error(`The name ${name} contains numbers, is not valid`);
    }
}

// Revisa en el modelo Specialty si la especialidad se encuentra en la colección, en caso de que si, está permitida
const specialtyExists = async (type = '') => {
    const specialtyExist = await Specialty.findOne({ type });  
    if( !specialtyExist ) {
        throw new Error(`Specialty ${type} is not permited`);  
    }
}

// Valida si ya existe en la BD un usuario con el documento indicado, en caso de que si, no crea el nuevo usuario
const idNumberUserExistsUser = async(idNumber = '') => {
    const idNumberExist = await User.findOne({ idNumber });
    if( idNumberExist ) {
        throw new Error(`The identification number ${idNumber} have already been registered`);
    }
}

// Valida si existe el usuario indicado para crear el appointment
const idNumberUserExistsAppointment = async(idNumber = '') => {
    const idNumberExist = await User.findOne({ idNumber });
    if( !idNumberExist ) {
        throw new Error(`You need to create an appointment for an existing user`);
    }
}

// Valida si existe un doctor en la base de datos con la especialidad indicada en el appointment
const specialtyDoctorExists = async(specialty = '') => {
    const specialtyExist = await Doctor.findOne({ specialty });
    if( !specialtyExist ) {
        throw new Error(`You need to create an appointment for an existing doctor that has the specialty`);
    }
}

// Utilizada mantener la integridad referencial. Una vez se elimina un usuario, se validan las citas médicas que tiene y también
// se eliminan
const deleteAppointmentUser = async (userIdNumber) => {
    
    const appointmentsArray = await Appointment.find({ idNumberUser: userIdNumber}).exec();
    
    appointmentsArray.forEach(async (appointment) => {
        const appointmentDeleted = await Appointment.findByIdAndDelete( appointment._id );
    });

}

// Utilizada para mantener integridad referencial. En caso de que se elimine un doctor y no existan mas doctores con la misma especialidad, 
// se eliminan todas las citas para dicha especialidad
const deleteAppointmentDoctor = async (specialty) => {

    const doctor = await Doctor.find({ specialty: specialty }).exec();
    
    console.log(doctor);
    
    if(doctor.length === 0) {
        const appointmentsArray = await Appointment.find({ specialty: specialty });
        console.log(appointmentsArray);
        appointmentsArray.forEach(async (appointment) => {
            const appointmentDeleted = await Appointment.findByIdAndDelete( appointment._id );
        });
    }

}

module.exports = {
    nameString,
    specialtyExists,
    idNumberUserExistsUser,
    idNumberUserExistsAppointment,
    specialtyDoctorExists,
    deleteAppointmentUser,
    deleteAppointmentDoctor
};