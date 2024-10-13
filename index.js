const port = 3000;

const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

let checkPoints = [
    { id: 1, visited: false },
    { id: 2, visited: false },
    { id: 3, visited: false }
];

app.get('/AllCheckpoints', (req, res) => {
    res.status(200).json(checkPoints);
});
app.post('/AddCheckpoint', (req, res) => {

    res.status(200).json('ok.');
});
app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});