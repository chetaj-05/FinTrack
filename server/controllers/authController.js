exports.registerUser = async (req, res) => {
    res.status(200).json({
        message: "Register route working"
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