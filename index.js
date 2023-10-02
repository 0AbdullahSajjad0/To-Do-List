import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

var dailyTasks = [];
var workTasks = [];

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/home", (req, res) => {
  res.render("index.ejs");
});

app.get("/createT", (req, res) => {
  res.render("createT.ejs");
});

app.post("/submit", (req, res) => {

  console.log(req.body.category);
  console.log(req.body.task);

  if(req.body.category === "Work" || req.body.category === "work")
  {
    workTasks.push(req.body.task);
    console.log("Work Tasks: ");
    for(var i = 0; i < workTasks.length; i++)
    {
      console.log(i + workTasks[i]);
    }
  }
  else if(req.body.category === "Daily" || req.body.category === "daily")
  {
    dailyTasks.push(req.body.task);
    console.log("Daily Tasks: ");
    for(var i = 0; i < dailyTasks.length; i++)
    {
      console.log(i + dailyTasks[i]);
    }
  }

  

  res.render("createT.ejs");
});

app.get("/viewT", (req, res) => {
  const data = {
    lengthD: dailyTasks.length,
    lengthW: workTasks.length,
    dailyTasks : dailyTasks,
    workTasks: workTasks 
  }
  
  res.render("viewT.ejs", data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
