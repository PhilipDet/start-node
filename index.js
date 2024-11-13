import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { supabase } from "./config/supabase.js";

const app = express();
const env = process.env;

app.get("/", (req, res) => {
    res.send(`
        <h1>Supabase API</h1>   
    `);
});

app.get("/songs", async (req, res) => {
    let { data: songs, error } = await supabase
        .from("songs")
        .select(`title, id`);
    if (error) {
        return res.status(500).send(`Error: ${error.message}`);
    }

    res.send(songs);
});

app.get("/artists", async (req, res) => {
    let { data: artists, error } = await supabase.from("artists").select(`*`);
    if (error) {
        return res.status(500).send(`Error: ${error.message}`);
    }

    res.send(artists);
});

app.get("/albums", async (req, res) => {
    let { data: albums, error } = await supabase
        .from("albums")
        .select(`title, image, artists(name)`);
    if (error) {
        return res.status(500).send(`Error: ${error.message}`);
    }

    res.send(albums);
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
