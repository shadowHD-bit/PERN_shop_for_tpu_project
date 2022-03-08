const ApiError = require('../errors/ApiErrors')

class UserController{
    async registration(req, res) {

    }

    async login(req, res) {
        
    }

    async checkAuth(req, res, next) {
        const {id} = req.query
        if(!id){
            return next(ApiError.badRequest('Не задан id'))
        }
        res.json(id)
    }
}

module.exports = new UserController()