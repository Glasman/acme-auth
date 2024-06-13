import client from "./client.js";
import { jwt } from "jsonwebtoken";


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

const getUser = async(username, password) => {
  try {
    const { rows: [ user ] } = await client.query(`
    SELECT username FROM users
    WHERE username='${username}' AND password='${password}';
    `);

    if(user) {
      
    }
    return user;
  } catch (error) {
    console.log(error)
  }
}

export { createUser, getUser };