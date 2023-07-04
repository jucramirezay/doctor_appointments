require('dotenv').config(); 
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const baseRoutes = require('../routes/base.routes');
const userRoutes = require('../routes/user.routes');
const doctorRoutes = require('../routes/doctor.routes');
const appointmentRoutes = require('../routes/appointment.routes');

const { dbConnection }  = require('../database/config.db'); 

// Clase principal que levanta el servidor 
class Server {

    constructor() {
        this.app = express();
        this.host = process.env.HOST; // Variable que toma el host del archivo .env
        this.port = process.env.PORT || 3000; // Variable que toma el puerto del archivo .env
        this.pathTransform = __dirname.substring(0, __dirname.length - 7);

        this.routePath = '/';

        // DB Connection
        this.dataBaseConnection();

        // Templates
        this.templates();

        // Middlewares
        this.middlewares();

        // App Routes
        this.routes();
    }

    // Conexión con la BD
    async dataBaseConnection() {
        await dbConnection();
    }

    // Carga la ruta para el renderizado de los views
    // Carga los archivos de la carpeta /public
    templates() {
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(this.pathTransform + '/views'));
        this.app.use(express.static(path.join(this.pathTransform + '/public')));
    }

    // Middlewares utilizados para levantar el servidor
    middlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false}));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
    }

    // Middleware que permite cargar las rutas 
    routes() {
        this.app.use(this.routePath, baseRoutes); 
        this.app.use(this.routePath, doctorRoutes);
        this.app.use(this.routePath, userRoutes);
        this.app.use(this.routePath, appointmentRoutes);
    }
    
    // Levantamiento del servidor
    listen() {
        this.app.listen(this.port,() => {
            console.log(`Server created in host ${this.host} and port ${this.port}`);
        });
    }

}

module.exports = Server;