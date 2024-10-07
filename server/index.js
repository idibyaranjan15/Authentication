import express from "express";
import { Port } from "./constants/constants.js";
import { connectDB } from "./DB/connectDB.js";
import Authrouter from "./routes/auth.route.js";
const app = express();

app.use(express.json());
app.use("/api/auth", Authrouter);

app.get("/", (req, res) => {
  res.send("Namaste Ji !");
});

app.listen(Port, () => {
  connectDB();
  console.log(`Server is Running on Dope Mode on Port ${Port} ....`);
});
