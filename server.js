require("dotenv").config(); // this line will pull all the environment varibales stated in .env file to this file and we can use them here

const express = require("express");
const app = express();
const port = 3000;

//configure mongoose to connect our monfodb database
const mongoose = require("mongoose");

// mongoose.connect(`mongodb://localhost/subscribers`, {useNewUrlParser: true})// either we cn give the whole path like this or add this url in .env file and thw give the path varible
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); // this will fetch the databse url from .env file
const db = mongoose.connection;
db.on("error", (error) => console.log(error)); // will check continously the events happening and will log the error if any
db.once("open", () => console.log("connected ton databse")); // will only run once and then remove itself, its just to make sure that we are connected to our database.

app.use(express.json());

const subRouter = require("./routes/subscribersRouter"); // will import the router from routes subscriber.js
app.use("/subscribers", subRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => console.log(`server started at port ${port}`));
