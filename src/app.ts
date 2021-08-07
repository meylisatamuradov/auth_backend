import express from "express";
import authRouter from "./router/auth";
import cors from "cors";
const app = express();
const port = 8000;

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use("/statics", express.static("statics"));
app.use("/auth", authRouter);

app.listen(port, () => console.log(`server is listening on ${port}`));
