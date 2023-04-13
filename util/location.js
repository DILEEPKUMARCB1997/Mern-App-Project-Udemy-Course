const { default: axios } = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = process.env.GOOGLE_API_KEY;

const getCoordinatesForAddress = async (address) => {
  return {
    lat: 12.9984212,
    lng: 77.590116,
  };

  // const response = await axios.get(
  //   `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
  //     address
  //   )}&key=${API_KEY}`
  // );
  // const data = response.data;
  // if (!data || data.status === "ZERO_RESULTS") {
  //   const error = new HttpError(
  //     "Could not find the location for the given address",
  //     422
  //   );
  //   throw error;
  // }
  // const coordinates = data;
  // console.log(coordinates);
  // return coordinates;
};

module.exports = getCoordinatesForAddress;
