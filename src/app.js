const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const error = "Some parameters were not informed, be sure to send: title: string, url: string, techs: string []";

function findIndexRepositorie(id){
    return repositories.findIndex(repo => repo.id === id);
}

function isRepoId(id) {
    return isUuid(id);
}

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {

    const { title, url, techs }  = request.body;
    
    const repositorie = { id: uuid(), title, url, techs, likes: 0 }

    repositories.push(repositorie);

    return response.json(repositorie);
});

app.post("/repositories/:id/like", (request, response) => {
    
    const { id } = request.params;

    if(!isRepoId(id)){
        return response.status(400).json({error: "Invalid repositorie id"});
    }

    const repoIndex = findIndexRepositorie(id);

    if(repoIndex === -1){
        return response.status(400).json({error: "Repositorie not found"});
    }

    const repo = repositories[repoIndex];

    repositories[repoIndex] = { ...repo, likes: repo.likes + 1 }

    return response.json(repositories[repoIndex]);

});

app.put("/repositories/:id", (request, response) => {
    
    const { id } = request.params;
    const { title, url, techs } = request.body;

    if(!isRepoId(id)){
        return response.status(400).json({error: "Invalid repositorie id"});
    }

    const repoIndex = findIndexRepositorie(id);

    if(repoIndex === -1){
        return response.status(400).json({error: "Repositorie not found"});
    }

    const repo = repositories[repoIndex];

    newRepo = { ...repo, title, url, techs  };

    repositories[repoIndex] = newRepo

    return response.json(newRepo);
});

app.delete("/repositories/:id", (request, response) => {

    const { id } = request.params;

    const repoIndex = findIndexRepositorie(id);

    if(repoIndex === -1){
        return response.status(400).json({error: "Repositorie not found"});
    }

    repositories.splice(repoIndex,1);

    return response.status(204).send();
});

module.exports = app;