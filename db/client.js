import pkg from 'pg';
const { Client } = pkg;
const client = new Client('postgres://localhost:5432/acme_auth')


export default client;