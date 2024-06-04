import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/assets', express.static(__dirname + '/dist/assets'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

app.get('/login', (req, res) => {
    console.log('logging in')
    res.send({value: 'logging on'})
})

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`))