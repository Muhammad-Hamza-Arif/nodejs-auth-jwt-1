const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { check, validationResult } = require('express-validator');
module.exports = {
  create: function (req, res, next) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    console.log("data in backeb=d", data);
    userModel
      .create(data)
      .then((result) => {
        res.send({ status: 200, msg: "User created successfully" });
      })
      .catch((err) => {
        res.send({ status: 500, msg: "Error creating user" });
      });
  },

  // create: [
  //    // Validation middleware
  //    check('name', 'Name is required').notEmpty(),
  //    check('email', 'Invalid email').isEmail(),
  //    check('password', 'Password must include a special character').matches(/[!@#$%^&*(),.?":{}|<>]/),
  //    check('password', 'Password must start with a capital letter').custom((value) => {
  //      if (!/^[A-Z]/.test(value)) {
  //        throw new Error('Password must start with a capital letter');
  //      }
  //      return true;
  //    }),
  //    check('password', 'Password must be 8 digits long').isLength({ min: 8 }),
  //    // Route handler
  //    function(req, res, next) {
  //      const errors = validationResult(req);
  //      if (!errors.isEmpty()) {
  //        return res.status(400).json({ errors: errors.array() });
  //      }
  //      const data = {
  //        name: req.body.name,
  //        email: req.body.email,
  //        password: req.body.password
  //      };
  //      userModel.create(data)
  //        .then((result) => {
  //          res.status(200).json({ status: 200, msg: 'User created successfully' });
  //        })
  //        .catch((err) => {
  //          res.status(500).json({ status: 500, msg: 'Error creating user' });
  //        });
  //    }
  //  ],

  authenticate: async (req, res, next) => {
    console.log("request -------------->", req.body);
    try {
      const userInfo = await userModel.findOne({ email: req.body.email });

      if (!userInfo) {
        res.json({
          status: "error",
          message: "Invalid email/password!!!",
          data: null,
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userInfo.password
      );
      console.log("isPassword : >>>>>", isPasswordValid);
      if (isPasswordValid) {
        const token = jwt.sign({ id: userInfo._id }, req.app.get("secretKey"), {
          expiresIn: "1h",
        });
        res.json({
          status: "success",
          message: "User found!!!",
          data: { user: userInfo, token: token },
        });
      } else {
        res.json({
          status: "error",
          message: "Invalid emailpassword!!!",
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  allusers: async (req, res, next) => {
    try {
      const users = await userModel.find({});
      const userList = users.map((users) => ({
        id: users._id,
        name: users.name,
        email: users.email,
        role: users.role,
      }));
      res.json({
        status: "success",
        message: "Movies list found!!!",
        data: { users: userList },
      });
    } catch (error) {
      next(error);
    }
  },
  updatePasswordUser: async (req, res) => {
    const saltRound = 10;
    try {
      const newPassword = req.body.newPassword;
      const hashPassword = await bcrypt.hash(newPassword, saltRound);
      await userModel.findByIdAndUpdate(req.params.userId, {
        password: hashPassword,
      });
      res.json({
        status: "success",
        message: "Password updated successfully!!!",
        data: null,
      });
    } catch (error) {
      res.json({
        status: "Failed to update",
        message: "Failed to update password",
        data: null,
      });
      next(error);
    }
  },
  updateRoledUser: async (req, res) => {
    console.log("backend console 123", req.body.role);
    try {
      await userModel.findByIdAndUpdate(req.params.userId, {
        role: req.body.role,
      });
      //     const users = await userModel.find({});
      //  const userList = users.map(users => ({
      //    id: users._id,
      //    name: users.name,
      //    email: users.email,
      //    role: users.role
      //  }));
      // { users: userList }

      res.json({
        status: "success",
        message: "Role updated successfully!!!",
        data: null,
      });
    } catch (error) {
      res.json({
        status: "Failed to update",
        message: "Failed to update Role",
        data: null,
      });
      next(error);
    }
  },
};
