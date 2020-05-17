const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4")

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.post("/repositories", (req, res) => {
    const { title, url, techs, likes } = req.body;
    const repository = { 
        id: uuid(), 
        title, 
        url, 
        techs,
        likes
    }
    repositories.push(repository);    
    return res.status(201).json(repository);
});

app.get("/repositories", (req, res) => {
    return res.json(repositories)
                .status(200);
});

app.put("/repositories/:id", (req, res) => {    
    const { id } = req.params;
    const { title, url, techs } = req.body;

    const index = repositories.findIndex(repo => repo.id === id);

    console.log(id);
    console.log(index);

    if(index < 0) {
        return res.status(400)
            .json({ error: 'Repository not found.'});
    }

    repositories[index].title = title;
    repositories[index].url = url;
    repositories[index].techs = techs;

    return res.send(204);
});

app.delete("/repositories/:id", (req, res) => {

    const { id } = req.params;
    const index = repositories.findIndex(repo => repo.id === id);

    if(index < 0) {
        return res.status(400)
            .json({ error: 'Repository not found.'});        
    }

    repositories.splice(index, 1);
    return res.status(200);
});

app.post("/repositories/:id/like", (req, res) => {    
    const { id } = req.params;

    const index = repositories.findIndex(repo => repo.id === id);

    if(index < 0) {
        return res.status(400)
            .json({ error: 'Repository not found.'});
    }

    repositories[index].likes = repositories[index].likes + 1;

    return res.status(201).send(repositories[index]);
});

module.exports = app;