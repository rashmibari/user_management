var User = require('../models/user');
const bcrypt = require('bcrypt');
const compose = require('composable-middleware');
const jwt = require('jwt-simple');

exports.register = function (req, res, next) {

    var user = new User({
        fullName: req.body.fullName,
        gender: req.body.gender,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
    });
    User.findOne({
        email: req.body.email
    }, function (err, userResult) {
        if (err) {
            next(err);
        } else {
            if (userResult) {
                res.json({
                    status: "error",
                    message: "User already exits with this email.",
                    data: null
                });
            } else {
                if (user.password) {
                    user.password = bcrypt.hashSync(user.password, 10);
                }
                user.save()
                    .then(user => {
                        res.send(user);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Something wrong while creating the user."
                        });
                    });
            }
        }
    });



};

exports.login = function (req, res, next) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            next(err);
        } else {
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                var token = jwt.encode(user, 'secret', 'HS512');
                res.json({
                    status: "success",
                    message: "user found!!!",
                    data: {
                        user: user,
                        token: token
                    }
                });
            } else {
                res.json({
                    status: "error",
                    message: "Invalid email/password!!!",
                    data: null
                });
            }
        }
    });

};

// Login Required middleware.
exports.isAuthenticated = function (req, res, next) {
    return compose()
        .use(function (req, res, next) {
            if (req.query && req.query.hasOwnProperty('accessToken')) {
                req.headers.authorization = 'Bearer ' + req.query.accessToken;
                delete req.query.accessToken;
            }

            if (!req.headers.authorization) {
                return res.send(401, new Error('Please make sure your request has an Authorization header'));
            }
            var token = req.headers.authorization.split(' ')[1];

            var payload = null;
            try {
                payload = jwt.decode(token, 'secret', 'HS512');
            } catch (err) {
                return res.send(401, err);
            }

            //verify if the user (application user from UI) token is valid
            if (payload.exp <= Date.now() && payload.exp !== -1) {
                return res.send(401, new Error('Token has expired'));
            }

            req.user = payload;

            if (options.isAuthenticated != null) {
                options.isAuthenticated(req, res, next);
            }

            next();
        });
};