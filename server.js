require('dotenv').config()
const express = require('express')
const app = express() 
app.use(express.json())
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const mysql = require('mysql')
const PORT = process.env.PORT

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'UserDB',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('DB connection succeded')
    else
        console.log('DB connection failed \n Error: ' + JSON.stringify(err,undefined,2))
})

app.use(express.static('./public'))
app.get('/', (req, res) => {
    res.redirect('login.html')
})

app.get('/user', (req,res)=>{
    mysqlConnection.query("SELECT * FROM ClientInformation", (err, rows, fields) =>{
        console.log("qwerty")
        res.json(rows)
    })
    res.end()
})
//Login Route
const loginRoute = require('./routes/login')
app.use('/login.html', loginRoute)

//Register Route
const registerRoute = require('./routes/register')
app.use('/register.html', registerRoute)

//Profile Management Route
const profileRoute = require('./routes/profile')
app.use('/profile.html', profileRoute)

//Get Quote Route
const getQuoteRoute = require('./routes/get_quote')
app.use('/get_quote.html', getQuoteRoute)

app.listen(PORT, () => console.log('Server Started on Port ' + PORT))

module.exports = mysqlConnection;