// const { verify } = require("jsonwebtoken");
const db = require("../models");
// const ROLES = db.ROLES;
const User = db.user;


signupVerify = (req, res, next) => {

  if (!req.body.email) {
    res.status(400).send({
      type: 'email',
      message: "Failed! Email is required!"
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).send({
      type: 'password',
      message: "Failed! Password is required!"
    });
    return;
  }

  if (req.body.password != req.body['confirm-password']) {
    res.status(400).send({
      type: 'confirm-password',
      message: "Failed! Password and Confirm Password are not the same!"
    });
    return;
  }

  if (!req.body.fullName) {
    res.status(400).send({
      type: 'fullName',
      message: "Failed! Full Name is required!"
    });
    return;
  }

  next();
}


checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  // User.findOne({
  //   where: {
  //     email: req.body.email
  //   }
  // }).then(user => {
  //   if (user) {
  //     res.status(400).send({
  //       message: "Failed! Username is already in use!"
  //     });
  //     return;
  //   }

  //   // Email
  //   User.findOne({
  //     where: {
  //       email: req.body.email
  //     }
  //   }).then(user => {
  //     if (user) {
  //       res.status(400).send({
  //         message: "Failed! Email is already in use!"
  //       });
  //       return;
  //     }

  //     next();
  //   });
  // });





  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (user) {
      res.status(400).send({
        type: 'email',
        message: "exists"
      });
      return;
    }

    next();
  })
};

// checkRolesExisted = (req, res, next) => {
//   if (req.body.roles) {
//     for (let i = 0; i < req.body.roles.length; i++) {
//       if (!ROLES.includes(req.body.roles[i])) {
//         res.status(400).send({
//           message: "Failed! Role does not exist = " + req.body.roles[i]
//         });
//         return;
//       }
//     }
//   }
//   next();
// };

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  signupVerify: signupVerify
  // checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
