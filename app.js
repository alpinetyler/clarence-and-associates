const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require('dotenv/config');

const PORT = 3020;

const app = express();
const {SERVER_PORT, GMAIL_USER, GMAIL_PASS} = process.env

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/contact.html");
})

app.post('/contact', (req, res) =>{

  // instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  })

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;

//console.log(`${firstName} ${lastName} ${email}`)
var message = "<p style='font-weight:bold;'> Hi. My name is John </p>";

  // specify what the email will look like
  const mailOptions = {
    from: `${email}`,
    to: GMAIL_USER,
    subject: `${email} Requests Free consultation`,
    html: `<img style="height:100px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeEXfr5jnA13j7LSLuNy7OzTUZaBg8LRrQgw&usqp=CAU">
          <p><strong style="color:blue">Name:</strong> ${firstName} ${lastName}
           <br><strong style="color:blue">Email:</strong> ${email}
           <br><strong style="color:blue">Request:</strong> Free bookkeeping consultation.`

  }

  // attempt to send the Email
  smtpTrans.sendMail(mailOptions, (error, response) => {
    if(error) {
      res.sendFile(__dirname + "/failure.html")
      //console.log("mail failed to send" + error)
    }else{
      // res.render('contact-success') // show a page indicating success
      res.sendFile(__dirname + "/success.html")
    }
  })
})

// redirect fom failure button to contact page
app.post("/failure", function(req, res){
    res.redirect("/contact")
});


app.listen(process.env.PORT || SERVER_PORT, function(){
  console.log(`The Server is now running on port ${SERVER_PORT}`)
});
