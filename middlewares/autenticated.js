var jwt = require('jsonwebtoken');

exports.ensureAuth = function(req,res,next){
    if(!req.headers.authorization){
        return res.status(403).send({message: "la peticion no tiene la cabecera de autentificaion"});
    }
    let token = req.headers.authorization.replace(/['"]+/g,'');

    jwt.verify(token, process.env.JWT_SECRETE, function(err, decoded) {
        if(err){return res.status(401).send({message: "Token invalido"});}
        req.user=decoded;
        next();
    });
};