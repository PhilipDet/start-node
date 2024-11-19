import express from "express";
import { songModel } from "../models/songModel.js";

export const songController = express.Router();

songController.use(express.urlencoded({ extended: true }));

songController.get("/songs", async (req, res) => {
    const data = await songModel.getAllSongs();
    res.status(200).json(data);
});

songController.get("/songs/:id([0-9A-Za-z]*)", async (req, res) => {
    const song = await songModel.getRecordById(req.params.id);
    res.status(200).json(song);
});

songController.post("/songs", async (req, res) => {
    const data = await songModel.createRecord(req.body);
    res.status(201).json(data);
});

songController.put("/songs", async (req, res) => {
    const data = await songModel.updateRecord(req.body);
    res.status(201).json(data);
});
