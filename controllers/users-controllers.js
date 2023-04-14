const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/user");

// const DUMMY_USERS = [
//   {
//     id: "user1",
//     name: "Dileep Kumar C B",
//     email: "dileep@gmail.com",
//     password: "dileep",
//   },
// ];

const getUsers = async (req, res, next) => {
  // res.status(200).json({ users: DUMMY_USERS });
  let users;
  try {
    users = await User.find({}, "-password");
    console.log(users);
  } catch (err) {
    const error = new HttpError("Fetching users failed, please try again", 500);
    return next(error);
  }

  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    // res.status(422).json({ errors: errors.errors.msg });
    return next(
      new HttpError("Invalid user inputs, please check your data", 422)
    );
  }
  const { name, email, password } = req.body;

  // const hasUser = DUMMY_USERS.find((user) => user.email === email);
  // if (hasUser) {
  //   throw new HttpError("Could not signup, Email already exists", 422);
  // }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User already exists, please login instead",
      422
    );
    return next(error);
  }

  // const createdUser = {
  //   id: uuid.v4(),
  //   name, //name:name
  //   email, //email:email
  //   password, //password :password
  // };

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create the user (password error), please try again",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    places: [],
  });
  console.log(User);
  console.log(createdUser);
  // console.log(req.file.path);
  // DUMMY_USERS.push(createdUser);
  try {
    await createdUser.save();
    // await createdUser.save();
  } catch (err) {
    const error = new HttpError("Sign up failed, please try again later", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        email: createdUser.email,
        // name: createdUser.name,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Sign up failed (Token Failure), please try again later",
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    // name: createdUser.name,
    token: token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login failed, please try again later", 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      "Invalid Credentials Entered, could not login",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid Credentials Entered, could not login",
      403
    );
    return next(error);
  }

  // const identifiedUser = DUMMY_USERS.find((user) => user.email === email);
  // if (!identifiedUser || identifiedUser.password !== password) {
  //   throw new HttpError(
  //     "Could not find the user, please enter the valid credentials",
  //     401
  //   );
  // }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
        // name: existingUser.name,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Login failed (Token Failure), please try again later",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
