const User = require('../models/User');
const TokenUtil = require('../utils/tokenUtil');

class AuthService {
    constructor(tokenUtil) {
        this.tokenUtil = tokenUtil;
    }

    async loginUser(email, password) {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Invalid email or password');
        }

        const token = this.tokenUtil.generateToken({ id: user._id, role: user.role });
        return { user, token };
    }
}

module.exports = new AuthService(TokenUtil);
