const express = require("express");
const app = express();
const momentWaktu = require("moment");
const koneksi_db = require("./../model/database"); // import database model

const logWaktu = (req, res, next) =>{
    console.log("req:")
    console.log(req.protocol + "://" + req.get('host') + req.originalUrl + "\nWaktu: " + momentWaktu().format("Do YYYY MMMM -> h:mm:ss a"));
    next();
}

// const logDb = (req, res, next)=>{
//     koneksi_db.connect().then(function(respon){
//         console.log("asdfasdfasdfasd");
//         console.log(koneksi_db.state);
//     });
//     next();
// }   


module.exports = logWaktu;