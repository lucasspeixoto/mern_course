const axios = require("axios");

const HttpError = require("../models/http-error");

const getCoordsForAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(
    address
  )}&format=json&limit=10`;

  const response = await axios.get(url);
  const data = response.data;

  if (!data) {
    const error = new HttpError(
      "Could not find location for this address",
      422
    );
    throw error;
  }

  const coordiantes = {
    lat: data[0].lat,
    lng: data[0].lon,
  };

  return coordiantes;
};

module.exports = getCoordsForAddress;
