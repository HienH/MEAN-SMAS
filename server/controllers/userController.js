const { User } = require('./../models/user.model');

module.exports.getUser = (req, res) => {
    const { userId } = req.params;
    User.findById(userId).populate('songs')
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json('Error:' + err));

};

module.exports.register = (req, res) => {
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.username = req.body.username;

    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) {
            newUser.save((err, doc) => {
                if (err) {
                    console.log(err);
                    res.json({
                        sucess: false, err: err
                    })
                }
                else {
                    res.status(200).json({
                        succuss: true,
                        userData: doc
                    })
                };
            });
        }
        else {
            res.status(409).json({
                message: "user already exist",
                sucess: false
            })
        }


    })

};

module.exports.login = (req, res) => {
    // Find email
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) return res.json({
            loginSuccess: false,
            message: 'Email not found'
        })

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({
                message: "wrong password",
                token: "no token"
            });
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('auth', user.token).status(200).json({
                    loginSuccess: true,
                    message: 'welcome',
                    token: user.token
                })
            })
        })
    })
}
module.exports.logout = (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.user._id },
        { token: '' },
        (err, doc) => {
            if (err) return res.json({
                success: false,
                error: err
            });
            return res.status(200).send({
                sucess: true
            })
        }
    )
};