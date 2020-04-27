// Model objek KPPS
// Hansrenee Willysandro 2020

const koneksi = require("./database");

var KPPS = {
    autentikasiByNIk: (nik, instruksi2)=>{
        console.log("isi nikkk" + nik);
        koneksi.query("select FIR_DATA from MASTER_user where NIK = " +
        koneksi.escape(nik) + " and is_KPPS = 1", function(error, hasil){
                if(error){
                    //console.log(hasil[0]);
                    instruksi2(true);
                    return
                }
                instruksi2(false, hasil[0]);
        });
    }

};

module.exports = KPPS;