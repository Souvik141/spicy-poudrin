import express from "express";
import mongoose from "mongoose";
import routes from "./routes.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
//connect to mongodb
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// on connection
mongoose.connection.on("connected", () => {
  console.log(`Connectd to database mongodb @ ${process.env.MONGO_URI}`);
});

mongoose.connection.on("error", (err) => {
  if (err) {
    console.log("Error in Database connection: " + err);
  }
});

app.use("/api", routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} environment on port ${process.env.SERVER_PORT}`
  );
});
