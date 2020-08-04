// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

//get request
app.get("/data", (req, res) => {
  res.send(projectData);
});
//post request to add the incomming data to the project data obj
app.post("/", (req, res) => {
  projectData.date = req.body.date;
  projectData.temperature = req.body.main.temp;
  projectData.feelings = req.body.feelings;
  res.end();
});

// Setup Server
const port = 8000;
app.listen(port, () => console.log(`server is running on port ${port} .. `));
