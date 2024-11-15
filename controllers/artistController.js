import express from "express";
import { artistModel } from "../models/artistModel.js";

export const artistController = express.Router();

artistController.get("/artists", async (req, res) => {
    const data = await artistModel.getAllArtists();
    res.status(200).json(data);
});
