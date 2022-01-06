import express from "express";
import path from "path";
import hbs from "hbs";
import { fileURLToPath } from "url";
import { forecast } from "./forecast.js";
const app= express();

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

// directory path specifications
const publicdirectory=path.join(__dirname, "../public");
const viewspath= path.join(__dirname,"../templates/views");
const partialspath=path.join(__dirname,"../templates/partials");

app.use(express.static(publicdirectory));
app.set("views", viewspath)
app.set("view engine", "hbs");
hbs.registerPartials(partialspath);

app.get("/",(req, res)=>{
    res.render("index", {
        title: "weather",
        Country: "India",
        forecast: "cool",
        name: "Seshu Puli"
    })
});

app.get("/about",(req, res)=>{
    res.render("about", {
        title: "Admin details: ",
        name: "Seshu Puli",
        Profession: "Developer"
    })
});

app.get("/help",(req, res)=>{
    res.render("help", {
        title: "Contact Details: ",
        name: "seshu Puli",
        Email: "ses.puli@abc.com"
    })
})
app.get("/weather",(req,res)=>{

    if(!req.query.address){
        return res.send({error: "Please enter valid address"});
    }
    const address=req.query.address;
    forecast(address,(err,data)=>{
        if(err){
            return res.send({
                error: err
            })
        }
        res.send({
            "Actual_temparature": data.actual,
            "Feels_Like": data.feelslike 
        })
    })
    // res.send({
    //     forecast: "It is cool",
    //     place: "India"
    // })
})

app.get("/help/*",(req, res)=>{
    res.render("error",{
        title: "Weather App ",
        name: "Seshu Puli",
        error: "Help article not found"
    })
})

app.get("*",(req, res)=>{
    res.render("error",{
        title: "Weather App ",
        name: "Seshu Puli",
        error: "404 Page Not Found"
    })
})

app.listen(3000, (err, res)=>{
    console.log("server started and listening on port 3000");
});