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
    /*
    Create a pricing module that should calculate the price per gallon based on this formula.

Suggested Price = Current Price + Margin

Where,

Current price per gallon = $1.50 (this is the price what distributor gets from refinery and it varies based upon crude price. But we are keeping it constant for simplicity)
Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)

Consider these factors:
Location Factor = 2% for Texas, 4% for out of state.
Rate History Factor = 1% if client requested fuel before, 0% if no history (you can query fuel quote table to check if there are any rows for the client)
Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
Company Profit Factor = 10% always

Example:
1500 gallons requested, in state, does have history (i.e. quote history data exist in DB for this client)

Margin => (.02 - .01 + .02 + .1) * 1.50 = .195
Suggested Price/gallon => 1.50 + .195 = $1.695
Total Amount Due => 1500 * 1.695 = $2542.50
    */
    await new Promise((res, rej) => {
        var sql = "SELECT * FROM fuelquote WHERE id = ?"
        mysqlConnection.query(sql, userID, (err, result) => {
            //If result length is bigger than 0 then the user already has fuel quote history
            if(result.length > 0) {
                newUser = false
                console.log(result)

                res(result)
            } else {
                newUser = true
                console.log(result)

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
})

module.exports = router

