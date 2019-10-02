const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("../services/jwt");

const isEmail = require('validator/lib/isEmail');

function register(req, res) {

    const password = req.body.password;
    const password_repeat = req.body.password_repeat;

    if (password == password_repeat) {

        if (isEmail(req.body.email)) {
            if(password.length < 6){
                return res.status(422).send({message: "Password is lees than 6 characters"}).end();
            }
            const newUser = new User({
                email: req.body.email.toLowerCase(),
                password: req.body.password,
            });

            User.createUser(newUser, function (err, user) {
                if(err){
                    return res.status(422).send({message: err.errors}).end();
                }
                let userJson = {
                    id: user._id,
                    email: user.email
                }
                return res.send(userJson).end();
            });
        } else {
            return res.status(422).send({message: "Email is incorrect"}).end();
        }

    } else {
        return res.status(422).send({message: "Passwords don't match"}).end();
    }
}

function login(req, res) {
    const params = req.body;
    const email = params.email;
    const password = params.password;
    if (!isEmail(req.body.email)) {
        return res.status(422).send({message: "Email is incorrect"}).end();
    }

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            return res.status(422).send({ message: "Error en la Peticion" });
        }
        if (!user) {
            return res.status(422).send({ message: "Bad email or password" });
        }
        bcrypt.compare(password, user.password, function (err, check) {
            if (check) {
                return res.status(200).send({
                    token: jwt.createToken(user)
                });
            } else {
                return res.status(422).send({ message: "Bad Password" });
            }
        });
    });
}

module.exports = {
    register,
    login,
};