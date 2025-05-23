const jwt = require('jsonwebtoken');

function generateToken(createdUser){
    return jwt.sign({email: createdUser.email, userid: createdUser._id}, process.env.JWT_KEY);
};

module.exports.generateToken = generateToken;