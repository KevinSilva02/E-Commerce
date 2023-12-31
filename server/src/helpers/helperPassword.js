const Bcrypt = require('bcrypt')
const { promisify } = require('util')

const hashAsync = promisify(Bcrypt.hash)
const compareAsync = promisify(Bcrypt.compare)
SALT = parseInt(process.env.SALT)

class PasswordHelper {
    static hashPassword(pass) {
        return hashAsync(pass, SALT)
    }

    static compare(pass, hash) {
        return compareAsync(pass, hash)
    }
}

module.exports = PasswordHelper