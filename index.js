import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const env = process.env;

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

import { songController } from "./controllers/songController.js";
app.use(songController);
import { artistController } from "./controllers/artistController.js";
app.use(artistController);
import { albumController } from "./controllers/albumController.js";
app.use(albumController);
import { personController } from "./controllers/personController.js";
app.use(personController);
import { carController } from "./controllers/carController.js";
app.use(carController);

app.get("/", (req, res) => {
    let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Forside</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>

        <script src="/js/script.js" defer></script>
        <body>
            <img src="/img/background.jpg" />
            <h1>Velkommen til min API</h1>
            <ul>
                <li><a href="/music">Musik</a></li>
                <li><a href="/person">Person</a></li>
                <li><a href="/car">Bil</a></li>
            </ul>
        </body>
        </html>
    `;
    res.send(html);
});

app.listen(env.PORT, () => {
    console.log(`Express server kører på http://localhost:${env.PORT}`);
});
