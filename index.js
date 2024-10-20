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
    const { id, visited, visitedAt } = req.body;
    if (id && typeof visited === 'boolean') {
        const timestamp = visitedAt ? parseInt(visitedAt) : Date.now();
        checkPoints.push({ id, visited, VisitTime: timestamp });
        res.status(201).json({ message: 'Checkpoint added successfully!', visitedAt: timestamp });
    } else {
        res.status(400).json({ message: 'Invalid data!' });
    }
});

app.post('/editCheckpoint', (req, res) => {
    const { currentId, visited, visitedAt } = req.body;

    const checkpointIndex = checkPoints.findIndex(point => point.id === parseInt(currentId));

    if (checkpointIndex !== -1 && typeof visited === 'boolean') {
        checkPoints[checkpointIndex].visited = visited;

        // עדכון הזמן
        checkPoints[checkpointIndex].VisitTime = visitedAt ? new Date(visitedAt).getTime() : Date.now();

        res.status(200).json({ message: 'Checkpoint updated successfully!' });
    } else {
        res.status(400).json({ message: 'Checkpoint not found or invalid data!' });
    }
});

app.post('/visitCheckpoint', (req, res) => {
    const { id } = req.body;

    const checkpointIndex = checkPoints.findIndex(point => point.id === parseInt(id));

    if (checkpointIndex !== -1) {
        checkPoints[checkpointIndex].visited = true;
        checkPoints[checkpointIndex].VisitTime = Date.now();

        res.status(200).json({ message: 'Checkpoint visit recorded successfully!' });
    } else {
        res.status(404).json({ message: 'Checkpoint not found!' });
    }
});





app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});