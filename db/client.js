// import { Client } from "pg";
import pkg from 'pg';
const { Client } = pkg;
const client = new Client('postgres://localhost:5432/acme_auth')

// module.exports = client;
export default client;