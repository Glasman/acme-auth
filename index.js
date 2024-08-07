import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createUser, getUser, getUserByToken } from "./db/users.js";
import bodyParser from 'body-parser';

import pkg from 'jsonwebtoken';
const { jwt } = pkg;

import client from "./db/client.js";
client.connect();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//this middleware is needed because it parses json data in a request body and makes it available under the req.body property
app.use(express.json());
app.use(bodyParser.json());

app.use("/assets", express.static(__dirname + "/dist/assets"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.get('/login', async(req, res, next) => {
  const user = await getUserByToken(req.headers.authorization)
  res.send(user)
})

app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await getUser(username, password);
    res.send({ token });
    console.log(token)
  } catch (err) {
    next(err);
  } 
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(401).send({ error: err.message})
})

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
