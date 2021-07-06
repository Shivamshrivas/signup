const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const  https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",(req,res)=>
{
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;
    const data={

        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields:
            {
                FNAME:firstname,
                LNAME:lastname

            }
        }]
    };
    const jsondata=JSON.stringify(data);
    const url="https://us6.api.mailchimp.com/3.0/lists/b7aa422c8e";
    const options={
        method:"POST",
        auth:"shiv:204ecb27f99c13a5a56eb7dfa9716b3c-us6"
    }
    const request=https.request(url,options,(response)=>
    {if(response.statusCode==200)
        {
            res.sendFile(__dirname+"/success.html");
        }
        else
        {
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",(data)=>
        {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata);
    request.end();

});
app.post("/failure",(req,res)=>
{
    res.redirect("/");
})
app.listen(3000,()=>
{
    console.log("Server is running on port 3000");
});


//204ecb27f99c13a5a56eb7dfa9716b3c-us6;
//b7aa422c8e