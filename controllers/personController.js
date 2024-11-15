import express from "express";
import { personModel } from "../classes/personModel.js";

export const personController = express.Router();

personController.get("/person", async (req, res) => {
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

    res.json(people);
});
