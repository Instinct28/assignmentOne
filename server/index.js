const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ruleRoute = require('./routes/ruleRoute');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/rule_engine').then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(err);
})

app.use('/api', ruleRoute);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});