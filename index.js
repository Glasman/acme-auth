import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getUser } from "./db/users.js";

import client from "./db/client.js";
client.connect();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//this middleware is needed because it parses json data in a request body and makes it available under the req.body property
app.use(express.json());

app.use("/assets", express.static(__dirname + "/dist/assets"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUser(username, password);
    res.send(user);
  } catch (err) {
    next(err);
  } 
});



const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
