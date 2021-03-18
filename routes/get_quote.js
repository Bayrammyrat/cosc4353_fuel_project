const express = require('express')
const router = express.Router()


router.post('/', (req, res) => {
    var gallons_input = gallons_input.req.body.gallons;
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
    
})
module.exports = router
