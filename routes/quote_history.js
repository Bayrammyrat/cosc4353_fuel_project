const express = require('express')
const router = express.Router()
const mysqlConnection = require("../utils/database")

userID = 0

router.get('/:id', (req, res) =>{
    userID = req.params.id

    var sql = "SELECT * FROM fuelquote WHERE id = ?"
    mysqlConnection.query(sql, userID, (err, result) => {
        res.render('quote_history', { userHist : result })
    })
})

router.post('/:id', (req, res) =>{
    res.redirect(`/get_quote/${userID}`)
})

module.exports = router