'use strict'
require('dotenv').config();
const mongoose= require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3977;


mongoose.connect(process.env.DB_HOST + process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true },(err,res) => {
    if(err){
        throw err;
    }else{
        console.log("la conexion a la base de datos esta corriendo correctamente...");
        app.listen(port, function(){
            console.log("Servido del api rest de loginTest escuchando en http://localhost:" +port);
        });
    }
});
mongoose.set('useCreateIndex', true);
