// Model objek peserta secara umum
// Hansrenee Willysandro 2020

const koneksi = require("./database");

// Parameter instruksi2 itu dinamis bisa apa saja
//kalau error dibuat 1 parameter aja agar lihat true
var DPT = { // konstruksi objek pemilih DPT
    ambilSemuaDPTHitung : (instruksi2)=>{
        koneksi.query("select count(*) as total from MASTER_user where is_KPPS = 0 and is_SAKSI = 0 and is_PENGAWAS_TPS =0;", function(err, rows){
            if(err){
                instruksi2(true);
                return;
            }
            instruksi2(false, rows);
        })
    },
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
    ambilNamaByNIK: function(nik, instruksi2){
        console.log("DATA NIK->" + nik);
        koneksi.query("select nama_lengkap from MASTER_user where NIK =" + koneksi.escape(nik) + ";", function(err, rows, fields){
           if(err){
               console.log("ERROR DATABASE->" + err);
               instruksi2(true);
               return;
           } else if(rows[0]["nama_lengkap"] == "" || rows[0]["nama_lengkap"] == null){
            instruksi2(true);
           } else {
            instruksi2(false, rows[0]["nama_lengkap"]);
           }
           
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