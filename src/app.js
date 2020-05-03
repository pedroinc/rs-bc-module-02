const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4")

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.post("/repositories", (req, res) => {
    const { title, url, techs } = req.body;
    const repository = { id: uuid(), title, url, techs }

    repositories.push(repository);
    return res.status(201).json(repository);
});

app.get("/repositories", (req, res) => {
    // TODO
    return res.json(repositories)
                .status(200);
});

app.put("/repositories/:id", (req, res) => {    
    const { id } = req.params;
    const { title, url, techs } = req.body;
    
    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(repoIndex < 0) {
        return res.status(400)
            .json({ error: 'Repository not found.'});
    }

    const repo = { id, title, url, techs, likes: 0 };
    repositories[repoIndex] = repo;
});

app.delete("/repositories/:id", (req, res) => {

    const { id } = req.params;
    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(repoIndex < 0) {
        return res.status(400)
            .json({ error: 'Repository not found.'});        
    }

    repositories.splice(index, 1);
    return res.status(200);
});

app.post("/repositories/:id/like", (req, res) => {    
    const { id } = req.params;

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    if(repoIndex < 0) {
        return res.status(400)
            .json({ error: 'Repository not found.'});
    }

    repositories[repoIndex].likes = repositories[repoIndex].likes + 1;
});

module.exports = app;