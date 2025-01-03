const userService = require("../services/user.service");
const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);

    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password } = req.body;
   

    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const hashpassword = await userModel.hashpassword(password);
    const user = await userService.createUser({
      name,
      email,
      password: hashpassword,
    });
    const token = await userModel.getSignedToken();
    res.status(201).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: err.message }] });
  }
};
