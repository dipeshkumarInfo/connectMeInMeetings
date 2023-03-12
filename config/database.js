require('dotenv').config();
const mongoose = require('mongoose');

const connectMongoDB = () =>  {
    // Database connection
    mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true});

    mongoose.connection.on('connected', () => {
        console.log('Database connected');
    });

    mongoose.connection.on('error',function (err) {  
        console.log('Mongoose default connection error: ' + err);
        return false;
    });

    mongoose.connection.on('disconnected', function () {  
       console.log('Mongoose default connection disconnected'); 
       return false;
    });
}

module.exports = {
    connectMongoDB
};