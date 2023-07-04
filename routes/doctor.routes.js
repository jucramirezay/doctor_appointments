const { Router }  = require('express')
const { check } = require('express-validator');

const { 
    nameString,
    specialtyExists
} = require('../helpers/db_validators');
const { fieldValidation, fieldPutValidation }  = require('../middlewares/field_validation');
const {
    newDoctor,
    getDoctor,
    getOnlyOneDoctor,
    deleteDoctor,
    updateDoctor
} = require ('../controllers/doctor.controller');

const router = Router();

// Ruta para la creación de un nuevo doctor
router.post('/newDoctor', [
    check('firstName').custom(nameString),
    check('lastName').custom(nameString),
    check('specialty').custom(specialtyExists), // Valida si la especialidad ingresada esta permitida
    check('office', "The office number must be an integer value").isInt(), // Valida si la oficina es un valor entero
    check('email', "The email isn't valid, please enter a valid email").isEmail(), // Valida si el email es valido
    fieldValidation
], newDoctor);

// Ruta para solicitar todos los doctores
router.get('/doctors', getDoctor);

// Ruta para solicitar un doctor por el ID
router.get('/doctor/:id', getOnlyOneDoctor);

// Ruta para eliminar un doctor
router.delete('/doctor/:id', deleteDoctor);

// Ruta para actualizar un doctor
router.put('/doctor/:id',  [
    check('firstName').custom(nameString),
    check('lastName').custom(nameString),
    check('specialty').custom(specialtyExists), // Valida si la especialidad ingresada esta permitida
    check('office', "The office number must be an integer value").isInt(), // Valida si la oficina es un valor entero
    check('email', "The email isn't valid, please enter a valid email").isEmail(), // Valida si el email es valido
    fieldPutValidation
], updateDoctor);

module.exports = router;