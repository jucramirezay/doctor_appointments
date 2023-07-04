const { request, response } = require('express');

const User  = require('../models/User');
const { deleteAppointmentUser } = require('../helpers/db_validators');

// Maneja la creación de un nuevo usuario
const newUser = async (req = request, res = response) => {
    const { firstName, lastName, idNumber, age, phoneNumber} = req.body;

    try {
        const user = new User({firstName, lastName, idNumber, age, phoneNumber});
        await user.save();

        res.render('newUser', {
            description: 'You have been created a new User with the following attributes: ',
            firstName,
            lastName,
            idNumber,
            age,
            phoneNumber,
        });
    } catch (error) {
        console.log(error);
    }
}

// Maneja la solicitud que pide mostrar todos los usuarios
const getUsers = async (req = request, res = response) => {

    try {
        const users = await User.find();
        res.render('users', {
            users
        });
    } catch {
        console.log(error);
    }
}

// Maneja la solicitud que pide mostrar un solo usuario
const getOnlyOneUser = async (req = request, res = response) => {   
    const userId = req.params.id;
    const body = req.query.type;

    if(body == 'delete') {
        try {
            const user = await User.findById( userId );
    
            res.render('onlyOneUser', {
                msg: `Do you want to delete the user ${user.firstName} ${user.lastName} and all their appointments (if it exists)?`,
                type: 'delete',
                user: user,
                error: false,
            });
        } catch (err) {
            console.log(err);
            res.render('onlyOneUser', {
                msg: `The user with the id ${userId} does not exist`,
                error: true
            });
        }
    } else if(body == 'edit') {
        try {
            const user = await User.findById( userId );
    
            res.render('onlyOneUser', {
                msg: `You are going to edit the User ${user.firstName} ${user.lastName}`,
                type: 'edit',
                user: user,
                error: false
            });
        } catch (err) {
            console.log(err);
            res.render('onlyOneUser', {
                msg: `The user with the id ${userId} does not exist`,
                error: true
            });
        }
    }
}

// Elimina el usuario indicado por el id
const deleteUser = async (req = request, res = response) => { 
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete({ _id: userId });
        const userName = user.firstName + ' ' + user.lastName;

        deleteAppointmentUser(user.idNumber);

        if(!user) { 
            res.json({ 
                element: userName,
                status: false,
            });
        } else { 
            res.json({
                element: userName,
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

// Edita el usuario indicado por el id
const updateUser = async (req = request, res = response) => {
    const userId = req.params.id;
    const body = req.body;
    
    try {
        const user = await User.findByIdAndUpdate( userId, body );
        res.json({ 
            element: `User ${user.firstName} ${user.lastName} has been modified`,
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
    newUser,
    getUsers,
    getOnlyOneUser,
    deleteUser,
    updateUser
}