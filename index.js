import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { supabase } from "./config/supabase.js";
import { greetingModel } from "./classes/greeting.js";
import { ageModel } from "./classes/age.js";
import { cardModel } from "./classes/card.js";

const app = express();
const env = process.env;

app.get("/", (req, res) => {
    res.send("Velkommen til min API");
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

app.get("/person", async (req, res) => {
    let person1 = {
        first_name: "Jane",
        last_name: "Smith",
        email: "janes@gmail.com",
        birthday: "1985-07-23",
        job_title: "Webudvikler",
        gender: "female",
    };
    let person2 = {
        first_name: "Peter",
        last_name: "Johnson",
        email: "peterj@gmail.com",
        birthday: "1978-11-15",
        job_title: "Bager",
        gender: "male",
    };
    let person3 = {
        first_name: "Emily",
        last_name: "Davis",
        email: "emilyd@gmail.com",
        birthday: "1992-03-30",
        job_title: "Tømrer",
        gender: "female",
    };

    let persons = [person1, person2, person3];
    persons.forEach((person) => {
        let greeting = new greetingModel(person.first_name, person.last_name);
        console.log(greeting.present());
        let age = new ageModel(person.birthday);
        console.log(age.present());
        let card = new cardModel(
            person.first_name,
            person.last_name,
            person.email,
            person.job_title
        );
        console.log(card.present());
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
