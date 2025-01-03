const userService = require("../services/user.service");
const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);

    return res.status(400).json({ errors: errors.array() });
  }
  
    const { name, email, password } = req.body;
   

    if (!name || !email || !password) {
     return res.status(400).json({ errors: [{ msg: "All fields are required" }] });
    }
    const hashpassword = await userModel.hashpassword(password);
    const user = await userService.createUser({
      name,
      email,
      password: hashpassword,
    });
    const token = await userModel.getAuthToken();
    res.status(201).json({ token, user });
 
};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
  
      return res.status(400).json({ errors: errors.array() });
    }
    
        const {email,password} = req.body;
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({errors:[{msg:'Invalid Credentials'}]});
        }
        const isMtached = await user.matchPassword(password);
        if(!isMtached){
            return res.status(401).json({errors:[{msg:'Invalid Credentials'}]});
        }
        const token = await user.getSignedToken();
        res.status(200).json({token,user});
    
    
};