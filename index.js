import express from "express";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.SUPABASE_URL);
console.log(process.env.SUPABASE_KEY);

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

app.listen(process.env.PORT, () => {
    console.log(`Express server kører på http://localhost:${process.env.PORT}`);
});
