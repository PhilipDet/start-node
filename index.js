import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { supabase } from "./config/supabase.js";

const app = express();

app.get("/", (req, res) => {
    res.send(`
        <h1>Velkommen til min hjemmeside!</h1>
        <p>Vi er en shop..</p>    
    `);
});

app.get("/products", (req, res) => {
    res.send(`
        <h1>Produkter</h1>
        <ul>
            <li>Produkt 1</li>
            <li>Produkt 2</li>
            <li>Produkt 3</li>
        </ul>
    `);
});

app.get("/contact", (req, res) => {
    res.send("Du kan kontakte os her...");
});

app.get("/test", async (req, res) => {
    let { data: songs, error } = await supabase
        .from("songs")
        .select(`*, artists(name)`);
    if (error) {
        return res.status(500).send(`Error: ${error.message}`);
    }

    if (songs && songs.length > 0) {
        console.log(songs);

        res.send(
            `<p>Songs found:</p>
            <ul>${songs
                .map(
                    (song) =>
                        `<li><strong>Title:</strong> ${song.title} - <strong>Artist:</strong> ${song.artists.name}</li>`
                )
                .join("")}</ul>`
        );

        res.end();
    } else {
        res.send("<p>No songs found</p>");
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Express server kører på http://localhost:${process.env.PORT}`);
});
