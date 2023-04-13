const uuid = require("uuid");
const fs = require("fs");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const getCoordinatesForAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");
const mongoose = require("mongoose");

let DUMMY_PLACES = [
  {
    id: "place1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "user1",
  },
  {
    id: "place2",
    title: "Bengaluru Palace Bengaluru",
    description: "One of the most famous Royal Palace in Bengauru",
    imageUrl:
      "https://lh3.googleusercontent.com/p/AF1QipNHvBtoADn3vXrixppCjv6seso2g07iqNJ-sbWS=s680-w680-h510",
    address: "Vasanth Nagar, Bengaluru, Karnataka 560052",
    location: {
      lat: 12.9984212,
      lng: 77.590116,
    },
    creator: "user2",
  },
  {
    id: "36aa8a26-bd25-4ac7-8ec4-04164173fc96",
    title: "Mysore Palace",
    description: " historical palace and a royal residence",
    location: {
      lat: 12.303992,
      lng: 76.6527528,
    },
    address: "Sayyaji Rao Rd, Agrahara, Chamrajpura, Mysuru, Karnataka 570001",
    creator: "user1",
  },
];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.placeId; // {placeId:"place1"}
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find the place",
      500
    );
    return next(error);
  }
  // const place = DUMMY_PLACES.find((p) => {
  //   return p.id === placeId;
  // });

  if (!place) {
    const error = new Error("Could not find a place for the given id! ", 404);
    return next(error);
    // error.code = 402;
    // throw error;

    // throw new HttpError("Could not find a place for the given id! ", 404);
  }
  res.json({ place: place.toObject({ getters: true }) }); //{place:place}
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid; //{uid:"user1"}

  // let places;
  let userWithPlaces;
  try {
    // places = await Place.find({ creator: userId });
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try agan later",
      500
    );
    return next(error);
  }
  // const places = DUMMY_PLACES.filter((p) => {
  //   return p.creator === userId;
  // });

  //if(!places || places.length === 0){
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    // const error = new Error("Could not find a place for the given user id!");
    // error.code = 404;
    // return next(error);

    return next(
      new HttpError("Could not find the places for the given user id! ", 404)
    );
  }
  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  }); //{place:place}
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new HttpError("Invalid inputs passed, please check your data.", 422));
  }
  const { title, description, address } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordinatesForAddress(address);
  } catch (error) {
    return next(error);
  }
  // const createdPlace = {
  //   id: uuid.v4(),
  //   title,
  //   description,
  //   location: coordinates,
  //   address,
  //   creator,
  // };
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find the user for the given id",
      404
    );
    return next(error);
  }
  console.log(user);
  // DUMMY_PLACES.push(createdPlace); // or we can use "unshift(createdPost)" to add at starting
  try {
    // await createdPlace.save();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Could not create the place, creating places failed, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    // res.status(422).json({ errors: errors.errors.msg });
    return next(
      new HttpError("Invalid user inputs, please check your updating data", 422)
    );
  }
  const { title, description } = req.body;
  const placeId = req.params.placeId;

  // const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  // const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the places",
      500
    );
    return next(error);
  }

  if (place.creator.toString() !== req.userData.userId) {
    const error = new HttpError("You are not allowed to edit this place", 401);
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the place",
      500
    );
    return next(error);
  }

  // DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;

  // if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
  //   throw new HttpError("Could not find the place for given id");
  // }
  // DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete place",
      500
    );
    return next(error);
  }

  // console.log(place);

  if (!place) {
    const error = new HttpError("Could not find the place for given id", 404);
    return next(error);
  }

  if (place.creator.id !== req.userData.userId) {
    const error = new HttpError(
      "You are not allowed to delete this place",
      401
    );
    return next(error);
  }

  console.log(place.creator.id);

  const imagePath = place.image;

  try {
    // place.deleteOne();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    place.deleteOne({ session: sess }); //removing place from places
    place.creator.places.pull(place); //removing place from user
    await place.creator.save({ session: sess }); //saving newly created user
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not able delete the place",
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Deleted the Place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
