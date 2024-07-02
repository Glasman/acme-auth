// attempts at import 
// import client from "./client.js";
// import pkg from 'jsonwebtoken';
// const { jwt } = pkg;
import jwt from 'jsonwebtoken';
import client  from './client.js'; // Adjust the path as necessary


const createUser = async (username, password) => {
  try {
    await client.query(`
        INSERT INTO users (username, password)
        VALUES ('${username}', '${password}')
        `);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (username, password) => {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT username FROM users
    WHERE username='${username}' AND password='${password}';
    `);

    if (user) {
      const assignedToken = jwt.sign({ username: user.username }, "secret");
      return assignedToken;
    } else {
      const error = new Error("bad credentials");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

const getUserByToken = async(token) => {
  try {
    const myToken = jwt.verify(token, "secret")
  } catch (error) {
    console.log(error)
  }
}

export { createUser, getUser, getUserByToken };