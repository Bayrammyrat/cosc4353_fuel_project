const express = require('express')
const router = express.Router()
let alert = require('alert')
const bcrypt = require('bcrypt')
const mysqlConnection = require("../utils/database")

router.get('/', (req, res) =>{
    res.render('login')
})

router.post('/', async (req, res) => {

    await new Promise((res, rej) => {
        //Check if user exists in the database
        var sql = "SELECT * FROM usercredentials WHERE username = ?"
        mysqlConnection.query(sql, req.body.username, (err, result) => {
            
            //If result length is bigger than 0 then the user exists in the database
            if(result.length > 0) {
                validUsername = true
                userID = result[0].id
                userPassword = result[0].password
                console.log(result)

                res(result)
            } else {
                validUsername = false
                console.log(result)

                res(result)
            }
        })
    })


    await new Promise((res, rej) => {
        //Check if user already has a profile
        var sql = "SELECT * FROM clientinformation WHERE id = ?"
        mysqlConnection.query(sql, userID, (err, result) => {

            //If result length is bigger than 0 then the user already has a profile
            if(result.length > 0) {
                firstTime = false

                res(result)
            } else {
                firstTime = true

                res(result)
            }

            console.log("firstTime for userID " + userID + ": " + firstTime)
        })
    })

    //If username is valid then check if password is correct
    if (validUsername == true) {
        const validPassword = await bcrypt.compare(req.body.password, userPassword)
        if (validPassword) {
            console.log('Successful Login')
            console.log("ID: " + userID)

            //If the user is a first time user then send them to fill out profile
            if(firstTime == true) {
                res.redirect(`profile/${userID}`)
            } else {
                res.redirect(`get_quote/${userID}`)
            }
        } else {
            console.log('Failed Login')
            alert('Failed Login')

            res.redirect('login')
        }
    } else {
        console.log('User does not exist')
        alert('User does not exist')

        res.redirect('login')
    }
})

module.exports = router