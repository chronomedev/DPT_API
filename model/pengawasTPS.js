// model pengawas TPS
// Hansrenee Willysandro 2020

const koneksi = require("./database");

var pengawasTPS = {
    autentikasiByNIk: (nik, instruksi2)=>{
        koneksi.query("select FIR_DATA from MASTER_user where NIK = " +
        koneksi.escape(nik) + " and is_PENGAWAS_TPS = 1", function(error, hasil){
                if(error){
                    //console.log(hasil[0]);
                    instruksi2(true);
                    return
                }
                instruksi2(false, hasil[0]);
        });
    }
};

module.exports = pengawasTPS;