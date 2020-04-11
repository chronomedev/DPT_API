// Routing API Peserta
// Hansrenee Willysandro 2020
const express = require("express");
const objekRouting = express();
const peserta = require("./../../model/peserta");


// fungsi pengecekan data untuk respon
function cekData(dataMasuk){
    if(dataMasuk == null || dataMasuk == ""){
        return "ksg";
    } else {
        return dataMasuk;
    }
}

objekRouting.get("/semua", (req, res)=>{ // Ambil semua informasi DPT
    peserta.objekDPT.ambilSemuaDPT((error, results)=>{
        if(error){
            res.send(500, "server error"); 
            return;
        }
        res.send(results);
    });    
});

objekRouting.post("/cekindividupemilih", (req, res)=>{ // Ambil semua informasi DPT dengan NIK
   peserta.objekDPT.ambilPemilihByNIK(req.body["nik"], (error, results)=>{
       if(error){
           res.send(500, "err");
           return;
       }
       res.send({
           "status" : "ok",
           "data_dpt" : cekData(results)
       });
   });
});

objekRouting.post("/autentikasi", (req, res)=>{
    peserta.objekDPT.autentikasiSidikJariDPT(req.body["nik"], (error, results)=>{
        if(error){
            res.send("ADA ERROR");
            return;
        }
        res.send({
            "status" : "ok",
            "data_dpt" : cekData(results)
        });

    });
});

module.exports = objekRouting;