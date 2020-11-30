const express = require("express");
const axios = require("axios");
const router = express.Router();
require('dotenv').config();

router.get("/location/:city", function (req, res) {
    //obtenemos localizacion segun las cordenadas
    axios
    .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${process.env.API}&units=metric`
        )
    .then((response) => {
        res.send(response.data.coord)
    }).catch(err =>{
        console.log(err)
        res.send(err)
    })
});
router.get("/current/:city", function (req, res) {
    //obtenemos los datos del clima de la ciudad 
    axios
    .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${process.env.API}&units=metric`
        )
    .then((response) => {

     res.send(response.data.main);
    }).catch(err =>{
      res.send(err)
    })

});
router.get("/forecast/:city", function (req, res) {
    //obtenemos los climas de los proximos 5 dias de la ciudad 
    axios
    .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${req.params.city}&appid=${process.env.API}&units=metric`
        )
    .then((response) => {
        //vamos al array list dont esta toda la data de los dias con sus climas
        var list = response.data.list
        
        var list_len = list.length
        //dividimos la lista en 5 . ya que la data me trae el clima de 5 dias cada 3 horad
        var one_day_totrecord = list_len / 5
        var records = []
        var k = 0
       //hacemos un loop para que me agregue info en los 5 dias 
        for(var j = 0; j < 5; j++) {
            var max_temp = min_temp = pressure = humidity = date = 0 
            var weather = {}
            // este 2do loop toma cada array calcula y almacena los datos
            for(var i = 0; i < one_day_totrecord; i++) {
                max_temp = list[k].main.temp_max + max_temp
                min_temp = list[k].main.temp_min + min_temp
                pressure = list[k].main.pressure + pressure
                humidity = list[k].main.humidity + humidity
                date = list[k].dt_txt
                k++
            }
            max_temp = max_temp / one_day_totrecord
            min_temp = min_temp / one_day_totrecord
            pressure = pressure / one_day_totrecord
            humidity = humidity / one_day_totrecord
            //guardamos todo en un objeto 
            weather = {
                date: date,
                max_temp: max_temp.toFixed(2),
                min_temp: min_temp.toFixed(2),
                pressure: Math.round(pressure),
                humidity: Math.round(humidity)
            }
            records.push(weather)
        }
        res.send(records);
     
    }).catch(err =>{
        console.log(err)
    })
    
});

module.exports = router;
