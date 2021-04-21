const express = require('express')
const router = express.Router()
const mysqlConnection = require("../utils/database")

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
        userZip: userZip,
        userPricePG: "",
        userTotal: "",
        userGallonsReq: "",
        userDateReq: ""
    })
})

router.post('/:id', async (req, res) => {
    await new Promise((res, rej) => {
        var sql = "SELECT * FROM fuelquote WHERE id = ?"
        mysqlConnection.query(sql, userID, (err, result) => {
            //If result length is bigger than 0 then the user already has fuel quote history
            if(result.length > 0) {
                newUser = false
                //console.log(result)

                res(result)
            } else {
                newUser = true
                //console.log(result)

                res(result)
            }
        })
    })

    currentPrice = 1.50
    companyProfitF = 0.10

    location = req.body.state
    gallons = req.body.gallons
    date = req.body.date

    //Location Factor
    if(location == 'TX') {
        locationF = 0.02
    } else {
        locationF = 0.04
    }

    //Rate History Factor
    if(newUser == false) {
        rateHistoryF = 0.01
    } else {
        rateHistoryF = 0
    }

    //Gallons Requested Factor
    if(gallons >= 1000) {
        gallonsF = 0.02
    } else {
        gallonsF = 0.03
    }

    margin = currentPrice * (locationF - rateHistoryF + gallonsF + companyProfitF)

    suggestedPrice = currentPrice + margin
    totalAmount = gallons * suggestedPrice

    if(req.body.btnClick == "Fuel Quote History") {
        console.log("Fuel Quote History Button Clicked")
        res.redirect(`/quote_history/${userID}`)
    }

    if(req.body.btnClick == "Get Quote") {
        console.log("Get Quote Button Clicked")
        res.render('get_quote', {
            userAddr1: userAddr1,
            userAddr2: userAddr2,
            userCity: userCity,
            userState: userState,
            userZip: userZip,
            userPricePG: suggestedPrice,
            userTotal: totalAmount,
            userGallonsReq: gallons,
            userDateReq: date
        })
    }

    if(req.body.btnClick == "Submit Quote" && req.body.total_due == "") {
        res.render('get_quote', {
            userAddr1: userAddr1,
            userAddr2: userAddr2,
            userCity: userCity,
            userState: userState,
            userZip: userZip,
            userPricePG: "",
            userTotal: "",
            userGallonsReq: "",
            userDateReq: ""
        })
    }

    if(req.body.btnClick == "Submit Quote" && req.body.total_due != "") {
        console.log("Submit Quote Button Clicked")

        if(userAddr2 != "") {
            fullAddress = userAddr1 + " " + userAddr2 + ", " + userCity + ", " + userState + " " + userZip
        } else {
            fullAddress = userAddr1 + ", " + userCity + ", " + userState + " " + userZip
        }

        var sql = 'INSERT INTO fuelquote SET ?'
        var post = {
            id: userID,
            gallons: req.body.gallons2,
            address: fullAddress,
            date: req.body.date2,
            price: req.body.price_per_gallon,
            total: req.body.total_due
        }
        mysqlConnection.query(sql, post, (err, result) => {
            console.log(result)
        })

        res.redirect(`/quote_history/${userID}`)
    }
    
})

module.exports = router

