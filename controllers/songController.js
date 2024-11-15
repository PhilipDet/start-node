import express from "express";
import { songModel } from "../models/songModel.js";

export const songController = express.Router();

songController.get("/songs", async (req, res) => {
    const data = await songModel.getAllSongs();
    res.status(200).json(data);
});
