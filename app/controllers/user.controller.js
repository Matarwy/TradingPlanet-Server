const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};


exports.me = (req, res) => {
  User
  .findOne({
    where: {
      id: req.userId
    }
  })
  .then((user) => {
    res
    .status(200)
    .send({
      id: user.id,
      // username: user.username,
      fullName: user.fullName,
      email: user.email,
    });
  })
  .catch((err) => {
    res.status(500).send(err);
  })
};
