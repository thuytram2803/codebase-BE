import express from "express"; 
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import authRoute from "./routes/AuthRoute.js";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)
app.use("/api/auth",authRoute);
routes(app);

app.get("/",(req,res) => {
    res.send("hello world");
})

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connnected to mongodb");
    })
    .catch((err) => {
        console.log(err);
    })


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})



