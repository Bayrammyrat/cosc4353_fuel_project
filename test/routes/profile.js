const express = require('express')
const router = express.Router()
const USPS = require('usps-webtools');
let alert = require('alert');  

//ARRAY FOR TESTING WITHOUT DATABASE ONLY
var userArray =  { username: 'asd123', password: 'asdf1234' }

const usps = new USPS({
  server: 'http://production.shippingapis.com/ShippingAPI.dll',
  userId: '767SALYR7333',
  ttl: 10000 //TTL in milliseconds for request
});

router.post('/', (req, res) => {
    var fullname = req.body.fullname
    var address1 = req.body.address1
    var address2 = req.body.address2
    var city = req.body.city
    var state = req.body.state
    var zip = req.body.zip

    usps.verify({
        street1: address1,
        street2: address2,
        city: city,
        state: state,
        zip: zip
      }, function(err, address) {
        try{
          if(address.footnotes=='N'){
            userArray = Object.assign(userArray, {fullname : req.body.fullname}, 
              {address1: req.body.address1}, {address2: req.body.address2}, 
              {city: req.body.city}, {state: req.body.state}, {zip: req.body.zip})
              res.redirect("get_quote.html")
          }
          else{
            alert("Invalid address!")
            res.redirect("profile.html")
          }
        }
        catch(err){
          alert("Invalid address!")
          res.redirect("profile.html")
        }
        console.log(userArray)
        console.log(address)
      });
})


module.exports = router