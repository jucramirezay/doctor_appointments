const mongoose = require('mongoose');

// Conexión con la base de datos
const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log("DataBase Online");

    } catch(error) {
        console.log(error);
        throw new Error("There has been an error updating the database connection");
    }

}

module.exports = {
    dbConnection
}