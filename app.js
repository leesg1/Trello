var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/trello")
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));


// SCHEMA SETUP
var cardSchema = new mongoose.Schema({
    name: String,
    category: String,
    status: String
});

var Card = mongoose.model("Card",cardSchema);



var cards = [
        {name:"WebDev", category:"CS", status:"Done"},
        {name:"Weasdasv", category:"CS", status:"Done"},
        {name:"Welojv", category:"CS", status:"Done"},
        
        {name:"Learn Avril 14th", category:"Piano", status:"Doing"},
        {name:"Learn Aqwasdth", category:"Piano", status:"Doing"},
        {name:"Learn Axzcth", category:"Piano", status:"Doing"},

        {name:"Learn Divenire", category:"Piano", status:"ToDo"},
        {name:"Learn Dasdire", category:"Piano", status:"ToDo"},
        {name:"Learn qwere", category:"Piano", status:"ToDo"},
        {name:"Learn Dasasdire", category:"Piano", status:"ToDo"}
    ]
    
    
app.get("/trello", function(req, res){
    
    Card.find({}, function(err, allCards){
        if(err){
            console.log(err);
        } else {
            res.render("trello", {cards: allCards});
        }
    })
})

app.post("/trello", function(req, res){
    // get data from form and add to cards array
    // redirect back to campgrounds page
    var name = req.body.name;
    var category = req.body.category;
    var status = req.body.status;
    console.log(status);
    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes(); 
               
    var newCard = {name:name, category:category,status:status, time:datetime};
    Card.create(newCard, function(err, createdCard){
        if(err){
            console.log(err);
        } else {
            res.redirect("/trello");
        }
    });
})

app.get("/trello/new",function(req,res){
    res.render("new");
})

// show route
app.get("/trello/:id", function(req,res){
    Card.findById(req.params.id, function(err, foundCard){
        if(err){
            console.log(err)
        } else {
            res.render("show", {card:foundCard})
        }
    })
})

// edit a card
app.get("/trello/:id/edit", function(req,res){
    Card.findById(req.params.id, function(err, foundCard){
        if(err){
            console.log(err)
        } else {
            res.render("edit", {card:foundCard})
        }
    })})

// updating card
app.put("/trello/:id", function(req, res){
    Card.findByIdAndUpdate(req.params.id, req.body.card, function(err, updatedCard){
        if(err){
            res.redirect("/trello")
        } else {
            res.redirect("/trello");
        }
    })
})

app.get("/angular", function(req, res){
    res.render("angular");
})

app.get("/opencv", function(req,res){
    res.render("opencv");
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Its working");
    
    
})