import express from "express";
import { albumModel } from "../models/albumModel.js";

export const albumController = express.Router();

albumController.get("/albums", async (req, res) => {
    const data = await albumModel.getAllAlbums();
    res.status(200).json(data);
});
