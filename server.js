require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path') 
app.use(express.json())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.PORT

app.use(express.static('./public'))
app.get('/', function(req, res){
    res.redirect('/login.html')
})

//Register Route
const registerRoute = require('./routes/register')
app.use('/register.html', registerRoute)

const profileRoute = require('./routes/profile')
app.use('/profile.html', profileRoute)

app.listen(PORT, () => console.log('Server Started on Port ' + PORT))