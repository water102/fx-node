const jwt = require('jsonwebtoken');

class FxJwt {
    sign(accountId, clientId) {
        let {
            secretKey,
            expiresIn
        } = global.config.jwt;
        const token = jwt.sign({
            accountId,
            clientId
        }, secretKey, {
                expiresIn
            });
        return token;
    }

    validate(req, res, next) {
        let {
            secretKey
        } = global.config.jwt;
        jwt.verify(req.headers['x-access-token'],
            secretKey,
            (err, decoded) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: err.message
                    });
                } else {
                    // add user id to request
                    req.tokenInfo = decoded;
                    next();
                }
            });
    }
}

module.exports = new FxJwt();