const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors);

const repos = [];

app.get("repos", (request, response) => {

});

app.post("repos", (request, response) => {

});

app.put("repos", (request, response) => {

});

app.delete("repos", (request, response) => {

});

module.exports = app;