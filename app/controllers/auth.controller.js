const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
// const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database

  User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      // if (req.body.roles) {
      //   Role.findAll({
      //     where: {
      //       name: {
      //         [Op.or]: req.body.roles
      //       }
      //     }
      //   }).then(roles => {
      //     user.setRoles(roles).then(() => {
      //       res.send({ message: "User registered successfully!" });
      //     });
      //   });
      // } else {
      //   // user role = 1
      //   user.setRoles([1]).then(() => {
        const token = jwt.sign({ id: user.id }, config.accessTokenSecret, {
          expiresIn: 86400 // 24 hours
        });
        res
        .status(200)
        .send({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          accessToken: token
        });
      //   });
      // }
    })
    .catch(err => {
      res.status(500).send({ type: 'email',message: 'exists' });
    });
};




exports.signin = (req, res) => {
  console.log(req.body)

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      console.log(user)
      if (!user) {
        return res.status(404).send({
          type: 'email',
          message: "notcorrect"
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          type: 'password',
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.accessTokenSecret, {
        expiresIn: 86400 // 24 hours
      });

      // var authorities = [];
      // user
      // .getRoles()
      // .then(roles => {
      //   for (let i = 0; i < roles.length; i++) {
      //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
      //   }
      // });
      res
      .status(200)
      .send({
        id: user.id,
        // username: user.username,
        fullName: user.fullName,
        email: user.email,
        // roles: authorities,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({
        type: 'email',
        message: 'notcorrect'
      });
    });
};
