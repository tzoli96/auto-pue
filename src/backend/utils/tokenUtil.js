const jwt = require('jsonwebtoken');
const config = require('../config/config');

class TokenUtil {
    static generateToken(payload) {
        return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
    }

    static verifyToken(token) {
        return jwt.verify(token, config.jwtSecret);
    }
}

module.exports = TokenUtil;
