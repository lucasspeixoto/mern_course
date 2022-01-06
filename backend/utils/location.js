const axios = require("axios");

const HttpError = require("../models/http-error");

const getCoordsForAddress = async (address) => {
  const url = `https://nominatim.openstreetmap.org/?addressdetails=1&q=${encodeURIComponent(
    address
  )}&format=json&limit=1`;

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

/* const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = require("../envs");

async function getCoordsForAddress(address) {
  const url = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${encodeURIComponent(
    address
  )}&format=json`;

  console.log(url)
  const response = await axios.get(url);

  const data = response.data[0];

  console.log(data);

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coorLat = data.lat;
  const coorLon = data.lon;
  const coordinates = {
    lat: coorLat,
    lng: coorLon,
  };

  return coordinates;
}

module.exports = getCoordsForAddress;
 */
