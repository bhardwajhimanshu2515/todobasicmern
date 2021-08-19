//import packages
const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");

//server create
const app = express();

//use middlewares
app.use(cors());
app.use(bodyParser.json());

//database URL
var dbURL = "mongodb://127.0.0.1:27017/todoMERNdatabase";

//now connect to mongodb database
mongodb.MongoClient.connect(dbURL, (err, client) => {
  if (err) {
    return console.log(err);
  }

  //if connected to database
  console.log("Connected to database");
  var newDB = client.db("todoMERNdatabase");

  //create API here

  //1. create todo api
  app.post("/createTodo", async (request, response) => {
    console.log("req.body=", request.body);

    //insert todo in database
    try {
      let createdTodo = await newDB.collection("todo").insertOne(request.body);
      console.log("createdTodo=", createdTodo);
      if (createdTodo.acknowledged === true) {
        response.status(200).json("Todo Has been created");
      }
    } catch (err) {
      console.log(err);
    }
  });

  //2. get todo api
  app.get("/getTodo", async (request, response) => {
    //read all todo from database
    try {
      let allTodo = await newDB.collection("todo").find({}).toArray();
      console.log("allTodo=", allTodo);
      return response.status(200).json(allTodo);
    } catch (err) {
      console.log(err);
      return response.status(500).json("Error in finding Todos");
    }
  });
});

app.listen(8081, () => {
  console.log("Server has started");
});
