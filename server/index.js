const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const ruleRoute = require('./routes/ruleRoute');

const app = express();
const PORT = 8001;

app.use(express.json());
app.use(cors());

app.use('/api', ruleRoute);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});