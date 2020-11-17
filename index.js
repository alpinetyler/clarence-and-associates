const express = require("express");
const bodyParser = require("body-parser");

const PORT = 3020;

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})


app.listen(PORT, function(){
  console.log("The Server is now running on port 3020")
});
