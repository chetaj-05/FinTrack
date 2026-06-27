const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const generateToken = require("../utils/generateToken");

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
const token = generateToken(user._id);

 res.status(201).json({
    success: true,
    message: "User Registered Successfully",
    token,
    user: {
        _id: user._id,
        name: user.name,
        email: user.email
    }
});
};

exports.loginUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid Credentials"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid Credentials"
        });
    }

    const token = generateToken(user._id);

    res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email
        }
    });

};
exports.getMe = async (req, res) => {
    res.status(200).json(req.user);
};
