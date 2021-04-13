const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 5.5),
    compare: async (password, hashPassword) => {
        const isPassEqual = await bcrypt.compare(password, hashPassword);

        if (!isPassEqual) {
            throw new Error('WRONG EMAIL OR PASSWORD')
        }
    }
};
