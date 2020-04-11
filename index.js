// Code back end utama
// Hansrenee WIllysandro 2020   
const express = require("express");
const app = express();
const logtrigger = require("./log/logserver");
const pesertaAPI = require("./routing/api/ambilPeserta");

//Middleware untuk log server
app.use(logtrigger);

app.use(express.urlencoded({extended:false}));
//Mid untuk subrouting
app.use("/member", pesertaAPI)



// Routing inti
app.get("/", (req, res)=>{
    res.send("SERVER BASIS DATA DPT RANCANG BANGUN E-VOTING BLOCKCHAIN");
});

app.get("*", (req, res)=>{
    var respon = {
        status : "unkwn",
        "PESAN" : "halaman tidak ditemukan"
    };
    res.json(respon);
});
app.post("/", (req, res)=>{
    res.json({
        status : "unknwn",
        "PESAN" : "tidak ada proses"
    });
});
//////////
app.listen(7337, ()=>{
    console.log(" ==== server jalan ====");
});

