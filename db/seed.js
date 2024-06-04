import client from "./client.js";
import { createUser } from "./users.js";

const createTables = async () => {
  try {
    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(30) UNIQUE,
            password VARCHAR(30) NOT NULL
        )`);
  } catch (error) {
    console.log(error);
  }
};

const dropTables = async() => {
    try {
        await client.query(`
        DROP TABLE IF EXISTS users`)
    } catch (error) {
        console.log(error)
    }
}

const syncAndSeed = async () => {
  try {
    await client.connect();
    console.log("CONNECTED TO DB!");

    await dropTables();
    console.log("tables dropped");

    await createTables();
    console.log("TABLES CREATED");

    await createUser('curly', 'curly');
    await createUser('larry', 'larry');
    await createUser('moe', 'moe');
    console.log('bros created')
  } catch (error) {
    console.log(error);
  }
};

syncAndSeed();
