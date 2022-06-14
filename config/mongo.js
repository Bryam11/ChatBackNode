const mongoose = require('mongoose');

const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useunifiedTopology: true,
        },
        (err, res) => {
            if (!err) {
                console.log("*** CONEXION CORRECTA ***")
            } else {
                console.log("*** ERROR DE CONEXION ***")
            }
        }
    );
};

//* Se especifica que se va a poder 
//* llamar de distintas partes
module.exports = dbConnect