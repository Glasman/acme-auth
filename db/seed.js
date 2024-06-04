import client from './client.js'

const createTables = async() => {
    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(30) UNIQUE,
            password VARCHAR(30) NOT NULL
        )`)
    } catch (error) {
        console.log(error)
    }
}

const syncAndSeed = async() => {
    try {
        await client.connect();
        console.log('CONNECTED TO DB!');

        await createTables();
        console.log('TABLES CREATED')
    } catch (error) {
        console.log(error)
    }
}

syncAndSeed()