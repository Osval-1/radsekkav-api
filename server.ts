import express,{Application} from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors, { CorsOptions } from "cors"
import auth from "./src/routes/auth.route"
import genealogy from "./src/routes/genealogy.route"

dotenv.config()

// const auth = require("./src/routes/auth.route");
// const genealogyRoutes = require("./src/routes/genealogy.route");

const app:Application = express();
const corsOptions:CorsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
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
app.use("/genealogy", genealogy);


app.listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
});
