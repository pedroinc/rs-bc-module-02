const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4")

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const validateRepository = (req, res, next) => {
    const { id } = req.params;

    req.repoIndex = repositories.findIndex(repo => repo.id === id);
    
    if(req.repoIndex < 0) {
        return res.status(400).json({ error: 'Repository not found.'});
    }
    return next();
};

app.post("/repositories", (req, res) => {
    const { title, url, techs, likes } = req.body;

    const repository = { 
        id: uuid(), 
        title, 
        url, 
        techs,
        likes: 0
    }
    repositories.push(repository);

    return res.status(201).send(repository);
});

app.get("/repositories", (req, res) => {
    return res.status(200).send(repositories);
});

app.put("/repositories/:id", validateRepository, (req, res) => {    
    const { title, url, techs } = req.body;

    repositories[req.repoIndex].title = title;
    repositories[req.repoIndex].url = url;
    repositories[req.repoIndex].techs = techs;

    return res.status(204).send();
});

app.delete("/repositories/:id", validateRepository, (req, res) => {
    repositories.splice(req.repoIndex, 1);

    return res.status(204).send();
});

app.post("/repositories/:id/like", validateRepository, (req, res) => {    
    repositories[req.repoIndex].likes = repositories[req.repoIndex].likes + 1;

    return res.status(201).send(repositories[req.repoIndex]);
});

module.exports = app;