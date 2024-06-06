import client from "./client.js";

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

const getUser = async() => {
  try {
    await client.query(`
    SELECT * FROM users
    WHERE username='${username}' AND password='${password}';`)
  } catch (error) {
    console.log(error)
  }
}

export { createUser, getUser };