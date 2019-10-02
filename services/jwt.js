var jwt = require('jsonwebtoken');
var moment = require('moment');

exports.createToken = function(user){
    const payload ={
        id: user._id,
        name: user.name,
        email: user.email,
        iat: moment().unix(),
    };
    return jwt.sign(payload,process.env.JWT_SECRETE);
};