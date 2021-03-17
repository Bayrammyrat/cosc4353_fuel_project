const express = require('express')
const router = express.Router()

router.post('/', (req, res) => { 
    console.log("Using Body-parser: ", req.body)
    console.log("Fullname: ", req.body.fullname)
    console.log("address: ", req.body.address1 + " " + req.body.address2)
    console.log("city: ", req.body.city)
    console.log("state: ", req.body.state)
    console.log("zip: ", req.body.zip)
    res.redirect("success.html") 
})

module.exports = router