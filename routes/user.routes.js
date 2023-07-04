const { Router }  = require('express')
const { check } = require('express-validator');

const { 
    nameString,
    idNumberUserExistsUser, 
} = require('../helpers/db_validators');
const { fieldValidation, fieldPutValidation } = require('../middlewares/field_validation');
const {
    newUser,
    getUsers,
    getOnlyOneUser,
    deleteUser,
    updateUser,
} = require ('../controllers/user.controller');

const router = Router();

// Ruta para crear un nuevo usuario
router.post('/newUser', [
    check('firstName').custom(nameString),
    check('lastName').custom(nameString),
    check('idNumber').isInt(),
    check('idNumber').custom(idNumberUserExistsUser),
    check('age').isInt(),
    check('phoneNumber').isInt(),
    fieldValidation
], newUser);

// Ruta para obtener los usuarios
router.get('/users', getUsers);

// Ruta para obtener un usuario por el ID
router.get('/user/:id', getOnlyOneUser); 

// Ruta para eliminar el usuario
router.delete('/user/:id', deleteUser);

// Ruta para actualizar el usuario
router.put('/user/:id',  [
    check('firstName').custom(nameString),
    check('lastName').custom(nameString),
    check('age').isInt(),
    check('phoneNumber').isInt(),
    fieldPutValidation
], updateUser);

module.exports = router;