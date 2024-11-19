import express from "express";
import { artistModel } from "../models/artistModel.js";

export const artistController = express.Router();

artistController.use(express.urlencoded({ extended: true }));

artistController.get("/artists", async (req, res) => {
    const data = await artistModel.getAllArtists();
    res.status(200).json(data);
});

artistController.get("/artists/:id([0-9A-Za-z]*)", async (req, res) => {
    const artist = await artistModel.getArtistById(req.params.id);
    res.status(200).json(artist);
});

artistController.post("/artists", async (req, res) => {
    const data = await artistModel.createArtist(req.body);
    res.status(201).json(data);
});

artistController.put("/artists", async (req, res) => {
    const data = await artistModel.updateArtist(req.body);
    res.status(201).json(data);
});
