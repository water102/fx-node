const jwt = require('jsonwebtoken');

class FxJwt {
  signAccessToken(accountId, clientId) {
    let { secretKey, accessTokenExpiresIn } = global.config.jwt;
    const token = jwt.sign(
      {
        accountId,
        clientId
      },
      secretKey,
      {
        accessTokenExpiresIn
      }
    );
    return token;
  }

  signRefeshToken(accountId, clientId) {
    let { secretKey, refeshTokenExpiresIn } = global.config.jwt;
    const token = jwt.sign(
      {
        accountId,
        clientId
      },
      secretKey,
      {
        refeshTokenExpiresIn
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
