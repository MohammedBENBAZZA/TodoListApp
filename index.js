const express = require('express');
const fs = require('fs');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/tasks', (req, res) => {
    let rawdata = fs.readFileSync('tasks.json');
    let tasks = JSON.parse(rawdata);
    res.send(tasks);
})
app.post('/api/tasks', (req, res) => {
    try {
        let rawdata = fs.readFileSync('tasks.json');
        let tasks = JSON.parse(rawdata);
        tasks.push(req.body);
        const jsonTasks = JSON.stringify(tasks)
        fs.writeFile('tasks.json', jsonTasks, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })
        res.send(req.body);
    }
    catch {
        console.log('error')
    }
})

app.delete('/api/tasks/:id', (req, res) => {


    try {
        const id = req.params.id;
        let rawdata = fs.readFileSync('tasks.json');
        let tasks = JSON.parse(rawdata);
        tasks = tasks.filter(item => {
            return item.id !== Number(id)
        })
        console.log('after delete', tasks);
        const jsonTasks = JSON.stringify(tasks)
        fs.writeFile('tasks.json', jsonTasks, err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('item deleted ')
            }
        })
        res.send(tasks);

    }
    catch {
        console.log('error')
    }
})


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on ${port}...`));
