const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    //check REST API method to server is on
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // get TOKEN

        if(!token) {
            res.status(401).json({message: 'without auth: empty token'})
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        next()

    } catch(e) {
        res.status(401).json({message: 'auth error: somthing wrong'})
    }
}