const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema= Schema({
    name: String,
    email: { type: String, index: true, required: true, unique: true, uniqueCaseInsensitive: true},
    password: String,
});
UserSchema.plugin(uniqueValidator, { message: 'La Cuenta de correo {VALUE} ya existe.' });
module.exports= mongoose.model('user',UserSchema);

module.exports.createUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save(callback);
      });
    });
}