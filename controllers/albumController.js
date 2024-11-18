import express from "express";
import { albumModel } from "../models/albumModel.js";

export const albumController = express.Router();

albumController.use(express.urlencoded({ extended: true }));

albumController.get("/albums", async (req, res) => {
    const data = await albumModel.getAllAlbums();
    res.status(200).json(data);
});

albumController.get("/albums/:id([0-9A-Za-z]*)", async (req, res) => {
    const album = await albumModel.getAlbumById(req.params.id);
    res.status(200).json(album);
});

albumController.post("/albums", async (req, res) => {
    const data = await albumModel.createAlbum(req.body);
    res.status(201).json(data);
});
