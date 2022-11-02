var User = require('./models/users');
const { MONGO_URL } = require('../config')
const { MongoClient } = require('mongodb');


async function register(user) {
    const client = new MongoClient(MONGO_URL);

    var new_user = new User({
        username: user.username
    });

    new_user.password = new_user.generateHash(user.password);
    new_user.username = user.username;
    console.log(new_user.username);
    await new_user.save();
    console.log("Here")
}

async function login(user) {
    User.findOne({ username: user.username }, function (err, user) {

        if (!user.validPassword(user.password)) {
            return { "authenticated": false };
        } else {
            const jwtBearerToken = jwt.sign({ "data": username });
            return { "token": jwtBearerToken };
        }

    });
}

module.exports = {
    register,
    login
}