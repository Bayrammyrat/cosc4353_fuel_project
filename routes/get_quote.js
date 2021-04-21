const express = require('express')
const router = express.Router()
const mysqlConnection = require("../utils/database")

//ARRAY FOR TESTING WITHOUT DATABASE ONLY
var userArray =  { username: 'asd123', password: 'asdf1234' }

userID = 0

//Get ID of user
router.get('/:id', async (req, res) => {
    userID = req.params.id

    await new Promise((res, rej) => {
        //Grab client information
        var sql = "SELECT * FROM clientinformation WHERE id = ?"
        mysqlConnection.query(sql, userID, (err, result) => {
            userAddr1 = result[0].address1
            userAddr2 = result[0].address2
            userCity = result[0].city
            userState = result[0].state
            userZip = result[0].zip
            
            res(result)
        })
    })

    res.render('get_quote', {
        userAddr1: userAddr1,
        userAddr2: userAddr2,
        userCity: userCity,
        userState: userState,
        userZip: userZip
    })
})

router.post('/:id', (req, res) => {

    console.log("TEST: " + userID)
    
    userArray = Object.assign(userArray, 
        {gallons : req.body.gallons}, 
        {date: req.body.date},
        {address1: req.body.address1}, 
        {address2: req.body.address2}, 
        {city: req.body.city}, 
        {state: req.body.state}, 
        {zip: req.body.zip})
    console.log(userArray)
    
    var gallons_input = req.body.gallons;
    var state_location = req.body.state;

    //HARD CODE FOR TESTING
    if(userArray.address1 == 'test address true') {
        var rate_History = true; 
    } else if (userArray.address1 == 'test address false') {
        var rate_History = false; 
    }

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

