// Inisialisasi model database untuk koneksi yang akan di export
// Hansrtenee Willysandro 2020

const mysql = require("mysql");
const informasi_basis_data = {
    host : "localhost",
    database: "fp_database_staging",
    user: "root",
    password: ""
};

var koneksi = mysql.createConnection(informasi_basis_data);
module.exports = koneksi;

