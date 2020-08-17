var User = require('../models/user');


exports.getProfile = function (req, res, next) {
    User.findOne({
        email: req.params.email
    }, function (err, user) {
        if (err) {
            next(err);
        } else {
            if (user) {
                res.json({
                    status: "success",
                    message: "user found!!!",
                    data: {
                        user: user
                    }
                });
            } else {
                res.json({
                    status: "error",
                    message: "No user details found with this email",
                    data: {
                        user: user
                    }
                });
            }
        }
    });

};

exports.updateProfile = function (req, res, next) {
    let data = req.body;
    let id = req.body.id;
    delete data.id;
    User.updateMany({
            _id: id
        }, {
            $set: data
        })
        .then(user => {
            res.send({
                status: "success",
                message: "User profile updated successfully!!!",
                data: {
                    user: user
                }
            });
        }).catch(err => {
            res.json({
                status: "error",
                message: `Error while updating the user profile ${err}`,
                data: null
            })
    });


};