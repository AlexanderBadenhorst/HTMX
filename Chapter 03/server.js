//import the express dependency
import express from "express";

//initialize the express framework
const app = express();

//Set static folder
app.use(express.static("public"));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

//Parse JSON bodies (as sent by API clients)
app.use(express.json());

let currentPrice = 60;
app.get("/get-price", (req, res) => {
  currentPrice = currentPrice + Math.random() * 2 - 1;
  res.send("$" + currentPrice.toFixed(1));
});

//Start the server; specify the poert the server will run on
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
