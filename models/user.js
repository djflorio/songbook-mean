const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Q = require('q');
var jwt = require('jsonwebtoken');
var env = require('../config/env');

var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: {type: String, required: true, index: { unique: true }},
    email: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true},
    date_joined: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });

    });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
}

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getAllUsers = function(callback) {
    User.find(callback);
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.createUser = function(newUser, callback) {
    newUser.save(callback);
}

module.exports.deleteUserById = function(id, callback) {
    let query = {_id: id};
    User.remove(query, callback);
}

module.exports.authenticate = function(username, password) {
    var deferred = Q.defer();

    User.findOne({ username: username }, function (err, user) {
        console.log("hash?");
        console.log(user.hash);
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (user && bcrypt.compareSync(password, user.password)) {
            deferred.resolve({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: jwt.sign({ sub: user._id }, env.session_secret)
            });
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}