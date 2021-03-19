const express = require('express')
const router = express.Router()

//ARRAY FOR TESTING WITHOUT DATABASE ONLY
var userArray =  { username: 'asd123', password: 'asdf1234' }
var quoteArray =  { username: 'asd123', password: 'asdf1234' }

router.post('/', (req, res) => {
    
    userArray = Object.assign(userArray, {gallons : req.body.gallons}, 
    {date: req.body.date})
    console.log(userArray)
   /*var gallons_input = gallons_input.req.body.gallons;
    var state_location = "TX";
    var rate_History = true; 
    var currentPrice = 1.5;

        if (gallons_input>1000 && state_location=="TX" && rate_History==true){
            price_per_gallons = currentPrice+ currentPrice*0.13;
            total_price =price_per_gallons*gallons_input;
            

        }else if (gallons_input>1000 && state_location=="TX"){
            return price-per-gallons == currentPrice+ currentPrice*0.14;
        }else if (gallons_input>1000 && rate_History==true){
            return price-per-gallons == currentPrice+ currentPrice*0.15;
        }else if (state_location=="TX" && rate_History==true){
            return price-per-gallons == currentPrice+ currentPrice*0.14;
        }else if (gallons_input>1000){
            return price-per-gallons == currentPrice+ currentPrice*0.16;
        }else if (state_location=="TX"){
            return price-per-gallons == currentPrice+ currentPrice*0.15;
        }else if (rate_History=true){
            return price-per-gallons == currentPrice+ currentPrice*0.16;
        }else {
            return price-per-gallons == currentPrice+ currentPrice*0.17;
        }
    */
})
router.get('/', (req, res) => {
    var name = 'hello';
    //res.render(__dirname + "/public/get_quote.html", {delivery_address:name});
    document.getElementById("delivery_address").value = name;
    console.log(name);
})
module.exports = router

