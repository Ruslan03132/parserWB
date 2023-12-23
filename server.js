import express from "express";
import { getQuantityKazanWB } from "./index.js";

const PORT = 8080;

const app = express();

async function start() {
    try {
        app.listen(PORT, () => {
            console.log("serverStarted, PORT: " + PORT);
            getQuantityKazanWB().then((value) => console.log(value));
        });
    } catch (e){
        console.log(e);
    }
}
start();  