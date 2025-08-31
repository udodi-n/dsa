import express from 'express';
import path from 'path';
import url from 'url';
import cors from 'cors';

const app = express();

app.use(cors( {
    origin: "http://localhost:3000/index.htm"
}))

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let link = `https://www.demonslayer-api.com/api/v1/characters`

// Middlware to parse form data
app.use(express.urlencoded({extended: true}));

app.get('/api/list', async (req, res) => {

    const page = req.query.page;
    
    const response = await fetch(`${link}?page=${page}`);
    const data = await response.json();
    console.log(`${link}?page=${page}`)
    res.json(data)
})

app.use(express.static(path.join(__dirname, 'public')));

app.post('/submit-data', async (req, res) => {
   const text = req.body.text;
    res.redirect('/index.htm')
    console.log(data)
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://locahost/${PORT}`);
})
