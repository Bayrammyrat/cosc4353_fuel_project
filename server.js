const bodyparser = require('body-parser') 
const express = require("express") 
const path = require('path') 
const app = express() 
   
var PORT = process.env.port || 3000 
  
// View Engine Setup 
app.set("views", path.join(__dirname)) 
app.set("view engine", "ejs") 
  
// Body-parser middleware 
app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 
   
app.get("/profile", function(req, res){ 
    res.render("public/profile") 
}); 
   
app.post('/profile', (req, res) => { 
    console.log("Using Body-parser: ", req.body)
    console.log("Fullname: ", req.body.fullname)
    console.log("address: ", req.body.address1 + " " + req.body.address2)
    console.log("city: ", req.body.city)
    console.log("state: ", req.body.state)
    console.log("zip: ", req.body.zip)
    res.render("public/success") 
}) 
   
app.listen(PORT, function(error){ 
    if (error) throw error 
    console.log("Server created Successfully on PORT", PORT) 
}) 