// Model objek peserta
// Hansrenee Willysandro 2020

const koneksi = require("./database");

// Parameter instruksi2 itu dinamis bisa apa saja
//kalau error dibuat 1 parameter aja agar lihat true
var DPT = { // konstruksi objek pemilih DPT
    ambilSemuaDPT : function(instruksi2){ 
        koneksi.query("select * from MASTER_user;", function(err, rows, fields){
            if(err){ 
                console.log(err); 
                instruksi2(true);
                return;
            }
            instruksi2(false, rows);

        });
    },
    ambilPemilihByNIK: function(nik, instruksi2){
        console.log("DATA NIK->" + nik);
        koneksi.query("select * from MASTER_user where NIK =" + koneksi.escape(nik) + ";", function(err, rows, fields){
           if(err){
               console.log("ERROR DATABASE->" + err);
               instruksi2(true);
               return;
           }
           instruksi2(false, rows);
        });
    },
    autentikasiSidikJariDPT: function(nik, instruksi2){
        console.log("DATA NIK->" + nik);
        koneksi.query("select FIR_DATA from MASTER_user where NIK =" + koneksi.escape(nik) + ";", function(err, rows, fields){
            if(err){
                console.log("ERROR DATABASE->" + err);
                instruksi2(true);
                return;
            }
            instruksi2(false, rows[0]);

            
        });
    }
}

module.exports = { 
    objekDPT : DPT
}