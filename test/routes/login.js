const express = require('express')
const router = express.Router()

//ARRAY FOR TESTING WITHOUT DATABASE ONLY
const userArray = [
    { username: 'asd123', password: 'asdf1234', firstTime: false },
    { username: '1a2s3d4f', password: '1a2s3d4f5g', firstTime: true }
]

router.post('/', (req, res) => {
    //Check if user exists
    const userCheck = userArray.find(index => index.username == req.body.username)
    if (userCheck == null) {
        console.log('User does not exist')
        res.redirect('login.html')
    }

    //If username exists, check if password matches
    try {
        if(userCheck.password == req.body.password) {
            console.log('Successful Login')

            if(userCheck.firstTime == true) {
                res.redirect('profile.html')
            } else {
                res.redirect('get_quote.html')
            }
        } else {
            console.log('Failed Login')
            res.redirect('login.html')
        }
    } catch {
        res.status(500).send()
    }
})

module.exports = router