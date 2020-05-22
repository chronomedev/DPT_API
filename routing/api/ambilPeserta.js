// Routing API Peserta
// Hansrenee Willysandro 2020
const express = require("express");
const objekRouting = express();
// import model
const peserta = require("./../../model/peserta");
const kpps = require("../../model/kpps");
const saksi = require("../../model/saksi");
const pengawasTPS =  require("../../model/pengawasTPS");

// fungsi pengecekan data untuk respon
function cekData(dataMasuk){
    if(dataMasuk == null || dataMasuk == ""){
        return "ksg";
    } else {
        return dataMasuk;
    }
}

objekRouting.get("/total", (req, res)=>{
    peserta.objekDPT.ambilSemuaDPTHitung((error, hasil)=>{
        if(error){
            res.send({status : -1});
            return;
        }
        res.send({status : 1, data : hasil});

    })
});
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

objekRouting.post("/nama/catatan_ttd", (req, res)=>{
    peserta.objekDPT.ambilNamaByNIK(req.body["kpps"], async(error, hasil1)=>{
        if(error){
            res.send({status : -1});
        } else {
            peserta.objekDPT.ambilNamaByNIK(req.body["saksi"], (error, hasil2)=>{
                if(error){
                    res.send({ status :-1});
                }
                peserta.objekDPT.ambilNamaByNIK(req.body["pengawas"], (error, hasil3)=>{
                    if(error){
                         res.send({ status :-1});
                    }
                        if(cekData(hasil1+hasil2+hasil3) != "ksg"){
                            res.send({status : 1,
                            data_dpt : [{
                                kpps : hasil1,
                                saksi : hasil2,
                                pengawas : hasil3
                            }]})
                        } else {
                            res.send({status : 0, data_dpt : "ksg"});
                        }
                    
                });
    
            });
        }
        
    });
});

// untuk request nama yang ditampilkan dari sertifikat  
objekRouting.post("/nama/sertifikat_ttd", (req, res)=>{
    peserta.objekDPT.ambilNamaByNIK(req.body["kpps"], async(error, hasil1)=>{
        if(error){
            res.send({status : -1});
        } else {
            peserta.objekDPT.ambilNamaByNIK(req.body["saksi"], (error, hasil2)=>{
                if(error){
                    res.send({ status :-1});
                }
                if(cekData(hasil1+hasil2) != "ksg"){
                    res.send({status : 1,
                    data_dpt : [{
                        kpps : hasil1,
                        saksi : hasil2
                    }]})
                } else {
                    res.send({status : 0});
                }
            });
        }
        
    })
});
objekRouting.post("/autentikasi/pengawas_tps", (req, res)=>{
    pengawasTPS.autentikasiByNIk(req.body["nik"], (er, hasil)=>{
        if(er){
            res.send({status : -1});
        }
        res.send({status : 1, data_dpt : cekData(hasil)});
        
    });
});

objekRouting.post("/autentikasi/saksi", (req, res)=>{
    saksi.autentikasiByNIk(req.body["nik"], (error, hasil)=>{
        if(error){
            res.send({
                status : -1
            });
        }
        res.send({
            status : 1,
            data_dpt : cekData(hasil)
        })
    })
});

objekRouting.post("/autentikasi/kpps", (req, res)=>{
    console.log(req.body);
    kpps.autentikasiByNIk(req.body["nik"], (error, results)=>{
        if(error){
            res.send({
                status : -1 
            });
            return;
        }
        res.send({
            "status" : "ok",
            "data_dpt" : cekData(results)
        });
    })
});

module.exports = objekRouting;