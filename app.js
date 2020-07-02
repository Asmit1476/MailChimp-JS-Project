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

    const url = "https://us10.api.mailchimp.com/3.0/lists/3eeb59bafc";

    const options = {

        method: "POST",
        auth: "asmit:6de799b50acb79d3d2cfafd199ec5739-us10"
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

//Mailchimp api key- 6de799b50acb79d3d2cfafd199ec5739-us10

//Audience unique id/list id - 3eeb59bafc