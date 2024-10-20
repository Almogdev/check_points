const port = 3000;

const express = require('express');
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('frontend'));

let checkPoints = [
    { id: 1, visited: false, VisitTime: null },
    { id: 2, visited: false, VisitTime: null },
    { id: 3, visited: false, VisitTime: null }
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

app.post('/editCheckpoint', (req, res) => {
    const { currentId, newId, visited } = req.body;

    console.log('Received data:', { currentId, newId, visited });

    const checkpointIndex = checkPoints.findIndex(point => point.id === currentId);

    if (checkpointIndex !== -1 && typeof visited === 'boolean') {
        console.log('Checkpoint found, updating...');
        checkPoints[checkpointIndex].id = newId;
        checkPoints[checkpointIndex].visited = visited;
        res.status(200).json({ message: 'Checkpoint updated successfully!' });
    } else {
        console.log('Checkpoint not found or invalid data!');
        res.status(400).json({ message: 'Checkpoint not found or invalid data!' });
    }
});



app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});