const { Router }  = require('express');
const { search, searchFilter, filter } = require('../controllers/search.controller');

const router = Router();

// Renderizado págiina principal
router.get('/', (req, res) => {
    res.render('index', { description: 'In this page you will be able to make an appointment.' });
});

// Renderizado de página para la creación de un doctor
router.get('/addDoctor', (req, res) => {
    res.render('addDoctor')
});

// Renderizado de página para la creación de un usuario
router.get('/addUser', (req, res) => {
    res.render('addUser')
});

// Renderizado de página para la creación de una cita
router.get('/addAppointment', (req, res) => {
    res.render('addAppointment')
});

// Maneja la solicitud al endPoint de busqueda y filtrado
router.get('/searchAppointments', searchFilter );

// Maneja la solicitud de busqueda
router.get('/userAppointments', search );

// Maneja la solicitud de filtrado
router.get('/specialtyAppointments', filter );

module.exports = router