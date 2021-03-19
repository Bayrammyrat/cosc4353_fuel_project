const express = require('express')
const router = express.Router()
let alert = require('alert')

//ARRAY FOR TESTING WITHOUT DATABASE ONLY
const userArray = [{
    username: 'asd123',
    password: 'asdf1234',
    firstTime: false
}]

router.post('/', (req, res) => {
    //console.log('Trying to create new user...')

    //console.log('Username: ' + req.body.username)
    //console.log('Password: ' + req.body.password)

    //Find if username already exists and adds user if username does not exist
    const userCheck = userArray.find(index => index.username == req.body.username)
    if (userCheck == null) {
        const user = {
            username: req.body.username,
            password: req.body.password,
            firstTime: true
        }
        userArray.push(user)
        console.log('New user created')
        console.log(userArray)

        res.redirect('login.html')
    } else {
        console.log('The username ' + userCheck.username + ' is already in use')
        alert('The username ' + userCheck.username + ' is already in use')
        res.redirect('register.html')
    }
})

module.exports = router