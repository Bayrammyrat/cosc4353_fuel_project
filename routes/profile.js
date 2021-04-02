const express = require('express')
const router = express.Router()
const USPS = require('usps-webtools');
let alert = require('alert');  
const mysqlConnection = require("../utils/database");

userID = 0

const usps = new USPS({
  server: 'http://production.shippingapis.com/ShippingAPI.dll',
  userId: '767SALYR7333',
  ttl: 10000 //TTL in milliseconds for request
});

//Get ID of user
router.get('/:id', (req, res) => {
  userID = req.params.id
  res.redirect('/profile.html')
})

router.post('/', (req, res) => {
    var fullname = req.body.fullname
    var address1 = req.body.address1
    var address2 = req.body.address2
    var city = req.body.city
    var state = req.body.state
    var zip = Number(req.body.zip)

    usps.verify({
        street1: address1,
        street2: address2,
        city: city,
        state: state,
        zip: zip
      }, function(err, address) {
        try{
          if(address.footnotes=='N' || address.footnotes==''){
            var sql = "INSERT INTO clientinformation (`id`, `fullname`, `address1`, `address2`, `city`, `state`, `zip`) VALUES ('" + userID + "', '" + fullname + "', '" + address1 + "', '" + address2 + "', '" + city + "', '" + state + "', '" + zip + "');";
            mysqlConnection.query(sql, function (err, result) {
              if (!err) {
                console.log("records inserted at id: " + userID);
              }
            })
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
        console.log(address)
      });

    
})


module.exports = router