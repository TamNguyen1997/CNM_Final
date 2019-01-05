var jwt = require('jsonwebtoken');

exports.isAuthenticated = function(req, res, next) {
    if (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'JWT') {
            var jwtToken =  req.headers.authorization.split(' ')[1];
            jwt.verify(jwtToken, config.jwtSecret, function(err, payload) {

                if (err) {
                    res.status(401).json({message: 'Unauthorized user!'});
                } else {
                    next();
                }
            });
        } else {
            res.status(401).json({ message: 'Unauthorized user!' });
        }
}