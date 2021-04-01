const express = require('express')
const router = express.Router()
let alert = require('alert')
const bcrypt = require('bcrypt')
const mysqlConnection = require("../utils/database")


router.post('/', async (req, res) => {

    //Check if user already exists in the database
    await new Promise((res, rej) => {
        var sql = "SELECT * FROM usercredentials WHERE username = ?"
        mysqlConnection.query(sql, req.body.username, (err, result) => {
            if(err) throw err
            
            //If result length is bigger than 0 then the user already exists in the database
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

    //If user does not exist then add user to database
    if (newUser == true) {

        //Encrypt password
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)

        var sql = 'INSERT INTO usercredentials SET ?'
        var post = {
            username: req.body.username,
            password: req.body.password
        }
        mysqlConnection.query(sql, post, (err, result) => {
            if(err) throw err

            console.log('New user created')
            console.log(result)
        })

        res.redirect('login.html')
    } else {
        console.log('The username ' + req.body.username + ' is already in use')
        alert('The username ' + req.body.username + ' is already in use')

        res.redirect('register.html')
    }
})

module.exports = router