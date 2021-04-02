const express = require('express')
const router = express.Router()
let alert = require('alert')
const bcrypt = require('bcrypt')
const mysqlConnection = require("../utils/database")

router.post('/', async (req, res) => {

    //Check if user exists in the database
    await new Promise((res, rej) => {
        var sql = "SELECT * FROM usercredentials WHERE username = ?"
        mysqlConnection.query(sql, req.body.username, (err, result) => {
            if(err) throw err
            
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

    //If username is valid then check if password is correct
    if (validUsername == true) {
        const validPassword = await bcrypt.compare(req.body.password, userPassword)
        if (validPassword) {
            console.log('Successful Login')
            console.log("ID: " + userID)

            res.redirect(`profile.html/${userID}`)
        } else {
            console.log('Failed Login')
            alert('Failed Login')

            res.redirect('login.html')
        }
    } else {
        console.log('User does not exist')
        alert('User does not exist')

        res.redirect('login.html')
    }
})

module.exports = router