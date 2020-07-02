const express = require("express");

const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    
    

    const data = {

        members: [

            {
                email_address: email,
                status: "subscribed",

                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            
            
            
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/xxxxxxxx";

    const options = {

        method: "POST",
        auth: "asmit:XXXXXXXXXXX-usxx"
    }

    const request = https.request(url, options, function(response){

        response.on("data", function(data){
            console.log(JSON.parse(data));
           
        });

    });
    request.write(jsonData);
    request.end;

});



app.listen(3000, function(req,res){

    console.log("Server is up and running on port 3000");
})

