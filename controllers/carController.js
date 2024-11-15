import express from "express";
import { carModel } from "../classes/carModel.js";

export const carController = express.Router();

carController.get("/car", async (req, res) => {
    let cars = [
        {
            brand: "Tesla",
            model: "Model 3",
            propellent: "Electric",
            range: 500,
            production_year: 2021,
            color: "Black",
            mileage_km: 10000,
            description: "Nice white Tesla Model 3",
            price: 500000,
        },
        {
            brand: "Volkswagen",
            model: "Golf",
            propellent: "Gasoline",
            range: 800,
            production_year: 2018,
            color: "White",
            mileage_km: 50000,
            description: "Nice white Volkswagen Golf",
            price: 200000,
        },
        {
            brand: "BMW",
            model: "i3",
            propellent: "Electric",
            range: 300,
            production_year: 2019,
            color: "Blue",
            mileage_km: 20000,
            description: "Nice blue BMW i3",
            price: 300000,
        },
    ];

    cars.forEach((car) => {
        let carM = new carModel(
            car.brand,
            car.model,
            car.propellent,
            car.range,
            car.production_year,
            car.color,
            car.mileage_km,
            car.description,
            car.price
        );
        console.log(carM.presentCar());
        console.log(carM.presentKmPerYear());
        console.log(carM.presentChargePerYear());
    });

    res.json(cars);
});
