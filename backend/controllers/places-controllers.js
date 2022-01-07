/* const uuid = require("uuid").v4; */
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const getCoordForAddress = require("../utils/location");
const Place = require("../models/place");
const User = require("../models/user");

// * Obter Local pelo id
const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) });
};

//* Obter locais para determinado usuário pelo id do mesmo
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  //! let places;
  let userWithPlaces;
  try {
    //! places = await Place.find({ creator: userId }).exec(); //no mongo vamos obter um cursor
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later.",
      500
    );
    return next(error);
  }

  //! if (!places || places.length === 0) {
  //!   const error = new HttpError(
  //!     "Could not find places for the provided user id.",
  //!     404
  //!   );
  //!   return next(error);
  //! }

  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    const error = new HttpError(
      "Could not find places for the provided user id.",
      404
    );
    return next(error);
  }

  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  });
};

//* Cria local
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    /*
     * Ao trabalhar com async, usar next ao invez de throw,
     *  pois o express não 'funciona bem' com throw
     */
    const error = new HttpError(
      "Invalid Inputs passed, please check Your data.",
      422
    );
    return next(error);
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "http://www.burningwell.org/gallery/var/albums/Cityscapes/dscn1782.jpg?m=1575118302",
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }
  /* Caso exista o usuário que está criando o local, serão necessários
  duas ações: Criar o local e atrelar esse local ao usuário em questão.
  Para isso podemos usar transactions e sessions. Transactions vai 
  permitir executar operações em paralelo; para trabalhar com
  transactions, é necessário iniciar uma session. */

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });

    user.places.push(createdPlace);
    await user.save({ session: sess });

    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  //* 201 - 'Algo' foi criado com sucesso no banco | 200 - 'Sucesso" normal
  res.status(201).json({ place: createdPlace });
};

//* Atualizar local ja cadastrado
const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid Inputs passed, please check Your data,",
      422
    );
    return next(error);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).exec();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not update place.",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not update place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
    /* populate perite referenciar um documento armazenado
     em outra collection e trabalhar com ele no documento em questão.
     Para o populate funcionar é necessário o Ref no Schema */
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not delete place.",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find place for this id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong could not delete place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted Place" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;