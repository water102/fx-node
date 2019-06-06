const jwt = require('jsonwebtoken');

class FxJwt {
  signAccessToken(accountId, clientId) {
    let { secretKey, accessTokenExpiresIn: expiresIn } = global.config.jwt;
    const token = jwt.sign(
      {
        accountId,
        clientId
      },
      secretKey,
      {
        expiresIn
      }
    );
    return token;
  }

  signRefeshToken(accountId, clientId) {
    let { secretKey, refeshTokenExpiresIn: expiresIn } = global.config.jwt;
    const token = jwt.sign(
      {
        accountId,
        clientId
      },
      secretKey,
      {
        expiresIn
      }
    );
    return token;
  }

  validate(req, res, next) {
    let { secretKey } = global.config.jwt;
    jwt.verify(req.headers['x-access-token'], secretKey, (err, decoded) => {
      if (err) {
        res.json({
          status: -1,
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
