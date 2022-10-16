import express from 'express';
import router from './routers/index.js';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


app.listen(process.env.PORT, () => {
    console.log("Server is listening on port " + process.env.PORT);
});