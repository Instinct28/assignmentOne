const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});