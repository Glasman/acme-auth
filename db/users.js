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

const getUser = async(username, password) => {
  try {
    const { rows: [ user ] } = await client.query(`
    SELECT username FROM users
    WHERE username='${username}' AND password='${password}';
    `);
    return user;
  } catch (error) {
    console.log(error)
  }
}

export { createUser, getUser };