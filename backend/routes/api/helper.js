const crypto = require('crypto');

const randomImageName = () => crypto.randomBytes(32).toString('hex')

module.exports = randomImageName
