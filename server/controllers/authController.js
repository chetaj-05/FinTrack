const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password){
    return res.status(400).json({
        message:"Please fill all fields"
    });
}
if(!validator.isEmail(email)){
    return res.status(400).json({
        message:"Invalid Email"
    });
}
if(password.length<6){
    return res.status(400).json({
        message:"Password should be at least 6 characters"
    });
}
const existingUser = await User.findOne({
    email
});
if(existingUser){
    return res.status(400).json({
        message:"User already exists"
    });
}
const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(password,salt);
const user = await User.create({
    name,
    email,
    password: hashedPassword
});

console.log(user);
 res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    user: {
        _id: user._id,
        name: user.name,
        email: user.email
    }
});
};

exports.loginUser = async (req, res) => {
    res.status(200).json({
        message: "Login route working"
    });
};

exports.getMe = async (req, res) => {
    res.status(200).json({
        message: "Current user route working"
    });
};