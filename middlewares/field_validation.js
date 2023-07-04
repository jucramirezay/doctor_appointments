const { validationResult } = require('express-validator');

// Middleware necesario para manejar los errores (en caso de que existan) de las validaciones que se realizan
// con express validator.
const fieldValidation = (req, res, next) => {
    
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        return res.status(400).render('errors', {
            error: errors.errors[0].msg
        });
    }

    next();
}

// Middleware necesario para manejar los errores (en caso de que existan) de las validaciones que se realizan
// con express validator. No retorna el renderizado de una página, sino un objeto JSON. 
const fieldPutValidation = (req, res, next) => {
    
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        return res.json({ 
            element: errors.errors[0].msg,
            status: false
        });
    }

    next();
}

module.exports = { 
    fieldValidation,
    fieldPutValidation
}