const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//LIST REPOSITORIES
app.get("/repositories", (req, res) => {
  
  return res.json(repositories);

});

//CREATE REPOSITORY
app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return res.json(repository);

});

//UPDATE REPOSITORY
app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(400).json({ erro: 'Repository not found!' });
  }

  const statusLikes = repositories[repositoryIndex].likes;

  const repository = {
    id,
    title,
    url,
    techs,
    likes: statusLikes
  };

  repositories[repositoryIndex] = repository;

  return res.json(repository);

});

//DELETE REPOSITORY
app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return res.status(400).json({ erro: 'Repository not found!' });
  }

  repositories.splice(repositoryIndex, 1);

  res.status(204).send();

});

//UPDATE LIKES
app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0) {
    return res.status(400).json({ erro: 'Repository not found!' });
  }

  repository = repositories[repositoryIndex];

  repository.likes++;

  return res.json(repository);
});

module.exports = app;
