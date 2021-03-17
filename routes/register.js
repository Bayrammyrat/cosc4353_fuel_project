const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    console.log('Trying to create new user...')

    console.log('Username: ' + req.body.username)
    console.log('Password: ' + req.body.password)

    res.redirect('login.html')
})

module.exports = router