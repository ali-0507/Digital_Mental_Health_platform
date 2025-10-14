require('dotenv').config();
// console.log("Loaded ENV keys:", Object.keys(process.env));
// const express = require('express'); 
// const app = express();
const mongoose = require('mongoose');
const app = require('./src/app');

// app.use(appModule);
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB...", err));

  


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});