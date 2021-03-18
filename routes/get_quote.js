const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    function quoteoutput (state,gallons,rateHistory){
        var gallons_input = gallons_input.gallons;
        var state_location = state_location.state;
        var rate_History = rate_History.rateHistory; 
        var currentPrice = 1.5;
        
        if (gallons_input>1000 && state_location=="TX" && rate_History==true){
            return price-per-gallons == currentPrice+ currentPrice*0.13;
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
    }
    
})

module.exports = router
