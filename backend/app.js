const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const { mongoUrl } = require("./envs");


const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

//Middleware que só é chamado caso não obtenha resposta do middleware anterior ( quando der erro em '/api/places')
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected :)')
    app.listen(5000);
  })
  .catch((error) => {
    console.log(`Connection Error: ${error}`);
  });
