const express = require('express')
const router = express.Router()

//ARRAY FOR TESTING WITHOUT DATABASE ONLY
var userArray =  { username: 'asd123', password: 'asdf1234' }
router.post('/', (req, res) => {
    
    userArray = Object.assign(userArray, 
        {gallons : req.body.gallons}, 
        {date: req.body.date},
        {state: req.body.state},
        {address1: req.body.address1}, 
        {address2: req.body.address2}, 
        {city: req.body.city}, 
        {state: req.body.state}, 
        {zip: req.body.zip})
    console.log(userArray)
    
    var gallons_input = req.body.gallons;
    var state_location = req.body.state;
    var rate_History = true; 
    var currentPrice = 1.5;
        if (gallons_input>1000 && state_location=="TX" && rate_History==true){
            console.log(price_per_gallons = currentPrice+ currentPrice*0.13);
            console.log(total_price =price_per_gallons*gallons_input);
        }else if (gallons_input>1000 && state_location=="TX"){
            console.log(price_per_gallons = currentPrice+ currentPrice*0.14);
            console.log(total_price =price_per_gallons*gallons_input);
        }else if (gallons_input>1000 && rate_History==true){
            console.log(price_per_gallons = currentPrice+ currentPrice*0.15);
            console.log(total_price =price_per_gallons*gallons_input);
        }else if (state_location=="TX" && rate_History==true){
            console.log(price_per_gallons = currentPrice+ currentPrice*0.14);
            console.log(total_price =price_per_gallons*gallons_input);
        }else if (gallons_input>1000){
            console.log(price_per_gallons = currentPrice+ currentPrice*0.16);
            console.log(total_price =price_per_gallons*gallons_input);
        }else if (state_location=="TX"){
            console.log(price_per_gallons = currentPrice+ currentPrice*0.15);
            console.log(total_price =price_per_gallons*gallons_input);
        }else if (rate_History=true){
            console.log(price_per_gallons = currentPrice+ currentPrice*0.16);
            console.log(total_price =price_per_gallons*gallons_input);
        }else {
            console.log(price_per_gallons = currentPrice+ currentPrice*0.17);
            console.log(total_price =price_per_gallons*gallons_input);
        }
    
})

module.exports = router

