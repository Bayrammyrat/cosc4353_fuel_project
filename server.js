require('dotenv').config()
const express = require('express')
const app = express() 
app.use(express.json())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const path = require('path');

const qbRoutes = require("./routes/qb");
const PORT = process.env.PORT
app.use(qbRoutes);
var ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(express.static('./public'))
app.get('/', (req, res) => {
    res.redirect('login.html')
})

//Login Route
const loginRoute = require('./routes/login')
app.use('/login.html', loginRoute)
app.use('/login', loginRoute)

//Register Route
const registerRoute = require('./routes/register')
app.use('/register.html', registerRoute)
app.use('/register', registerRoute)

//Profile Management Route
const profileRoute = require('./routes/profile')
app.use('/profile.html', profileRoute)
app.use('/profile', profileRoute)
//Get Quote Route
const getQuoteRoute = require('./routes/get_quote')
app.use('/get_quote.html', getQuoteRoute)
app.use('/get_quote', getQuoteRoute)

app.listen(PORT, () => console.log('Server Started on Port ' + PORT))