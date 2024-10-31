import express,{Application} from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import auth from "./src/routes/auth.route"

dotenv.config()

// const auth = require("./src/routes/auth.route");
// const genealogyRoutes = require("./src/routes/genealogy.route");

const app:Application = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
mongoose.connect(process.env.MONGOURL as string);
mongoose.connection.on("connected", () => {
  console.log("connected to mongoDB");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting to mongoDB", err);
});

app.use(cors(corsOptions));
app.use(express.json());
app.use("/auth", auth);
// app.use("/genealogy", genealogyRoutes);


app.listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
});
