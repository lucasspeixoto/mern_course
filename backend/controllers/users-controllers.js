/* const { v4: uuidv4 } = require('uuid'); */
const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Lucas Peixoto",
    email: "lspeixotodev@gmail.com",
    password: "teste123",
  },
  {
    id: "u2",
    name: "Liana Fernandes",
    email: "lianacgf@gmail.com",
    password: "teste123",
  },
  {
    id: "u3",
    name: "Arnold Schwarzenegger",
    email: "arnold@gmail.com",
    password: "teste123",
  },
];

const getUsers = (req, res, next) => {
  const users = DUMMY_USERS;
  if (!users) {
    throw new HttpError("Could not find any users.", 404);
  }
  res.json({ users });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid Inputs passed, please check Your data,", 422);
  }

  const { name, email, password } = req.body;

  // Checking existing user
  const hasUser = DUMMY_USERS.find((user) => user.email === email);

  if (!!hasUser) {
    throw new HttpError(
      "This email already exists in another account, please go to the login page.",
      404
    );
  }

  const createdUser = {
    id: uuid(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { password, email } = req.body;
  const identifiedUser = DUMMY_USERS.find((user) => user.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong.",
      401
    );
  }

  res.json({ message: "Logged In :)" });
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
