const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Use the DB_URL from environment variables
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/mydb";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

app.listen(49160, () => {
    console.log("Server is listening on port 49160");
});
