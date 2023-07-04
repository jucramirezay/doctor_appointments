const { Router }  = require('express')
const { check } = require('express-validator');

const { 
    idNumberUserExistsAppointment, 
    specialtyDoctorExists
} = require('../helpers/db_validators');
const  { fieldValidation, fieldPutValidation } = require('../middlewares/field_validation');
const {
    newAppointment,
    getAppointment,
    getOnlyOneAppointment,
    deleteAppointment,
    updateAppointment
} = require ('../controllers/appointment.controller');

const router = Router();

// Creación de una nueva cita
router.post('/newAppointment', [
    check('idNumberUser').custom(idNumberUserExistsAppointment),
    check('specialty').custom(specialtyDoctorExists),
    fieldValidation
], newAppointment);

// Solicitud de todas las citas
router.get('/appointments', getAppointment);

// Solicitud de una sola cita
router.get('/appointment/:id', getOnlyOneAppointment);

// Eliminación de una cita
router.delete('/appointment/:id', deleteAppointment);

// Actuaalización de una cita
router.put('/appointment/:id',  [
    check('specialty').custom(specialtyDoctorExists),
    fieldPutValidation
], updateAppointment);

module.exports = router;