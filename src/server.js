import express from 'express';
import router from './routers/index.js';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


app.listen(4000, () => {
    console.log("Server is listening on port " + 4000);
});