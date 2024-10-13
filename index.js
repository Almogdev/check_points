const port = 3000;

const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('frontend'));

let checkPoints = [
    { id: 1, visited: false },
    { id: 2, visited: false },
    { id: 3, visited: false }
];
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
})

app.get('/checkpointList', (req, res) => {
    res.status(200).json(checkPoints);
});

app.post('/addCheckpoint', (req, res) => {
    const { id, visited } = req.body;
    if (id && typeof visited === 'boolean') {
        checkPoints.push({ id, visited });
        res.status(201).json({ message: 'Checkpoint added successfully!' });
    } else {
        res.status(400).json({ message: 'Invalid data!' });
    }
});

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});