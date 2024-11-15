import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { supabase } from "./config/supabase.js";

import { personModel } from "./classes/personModel.js";
import { carModel } from "./classes/carModel.js";

import { songModel } from "./models/songModel.js";
import { artistModel } from "./models/artistModel.js";
import { albumModel } from "./models/albumModel.js";

const app = express();
const env = process.env;

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

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

app.get("/music", async (req, res) => {
    const songs = await songModel.getAllSongs();
    const artists = await artistModel.getAllArtists();
    const albums = await albumModel.getAllAlbums();
    console.log(songs);
    console.log(artists);
    console.log(albums);

    res.end();
});

app.get("/person", async (req, res) => {
    let people = [
        {
            first_name: "Jane",
            last_name: "Smith",
            email: "janes@gmail.com",
            birthday: "1985-07-23",
            job_title: "Webudvikler",
            gender: "female",
        },
        {
            first_name: "Peter",
            last_name: "Johnson",
            email: "peterj@gmail.com",
            birthday: "1978-11-15",
            job_title: "Bager",
            gender: "male",
        },
        {
            first_name: "Emily",
            last_name: "Davis",
            email: "emilyd@gmail.com",
            birthday: "1992-03-30",
            job_title: "Tømrer",
            gender: "female",
        },
    ];

    people.forEach((person) => {
        let personM = new personModel(
            person.first_name,
            person.last_name,
            person.email,
            person.birthday,
            person.job_title
        );
        console.log(personM.presentGreeting());
        console.log(personM.presentCard());
        console.log(personM.presentAge());
    });

    res.end();
});

app.get("/car", async (req, res) => {
    let cars = [
        {
            brand: "Tesla",
            model: "Model 3",
            propellent: "Electric",
            range: 500,
            production_year: 2021,
            color: "Black",
            mileage_km: 10000,
            description: "Nice white Tesla Model 3",
            price: 500000,
        },
        {
            brand: "Volkswagen",
            model: "Golf",
            propellent: "Gasoline",
            range: 800,
            production_year: 2018,
            color: "White",
            mileage_km: 50000,
            description: "Nice white Volkswagen Golf",
            price: 200000,
        },
        {
            brand: "BMW",
            model: "i3",
            propellent: "Electric",
            range: 300,
            production_year: 2019,
            color: "Blue",
            mileage_km: 20000,
            description: "Nice blue BMW i3",
            price: 300000,
        },
    ];

    cars.forEach((car) => {
        let carM = new carModel(
            car.brand,
            car.model,
            car.propellent,
            car.range,
            car.production_year,
            car.color,
            car.mileage_km,
            car.description,
            car.price
        );
        console.log(carM.presentCar());
        console.log(carM.presentKmPerYear());
        console.log(carM.presentChargePerYear());
    });

    res.end();
});

app.get("/test", async (req, res) => {
    let { data: songs, error } = await supabase
        .from("songs")
        .select(`*, artists(name, image)`);
    if (error) {
        return res.status(500).send(`Error: ${error.message}`);
    }

    res.send(
        `<p>Songs found:</p>
            <ul>${songs
                .map(
                    (song) =>
                        `<li>
                            <strong>Title:</strong> ${song.title} - 
                            <strong>Artist:</strong> ${song.artists.name} - 
                            <img style='width:100px' src="${env.SUPABASE_URL}/storage/v1/object/public/images/artists/${song.artists.image}" />
                        </li>`
                )
                .join("")}</ul>`
    );
});

app.listen(env.PORT, () => {
    console.log(`Express server kører på http://localhost:${env.PORT}`);
});
