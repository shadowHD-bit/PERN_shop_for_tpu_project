const ApiError = require('../errors/ApiErrors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, Likes} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    )
}

class UserController{
    async registration(req, res, next) {
        const {email, password, name, family, date_birthday, numberPhone, gender, allowSpam, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({name, family, date_birthday, numberPhone, email, role, gender, allowSpam, password: hashPassword, isVK:false, isGoogle:false})
        const basket = await Basket.create({userId: user.id})
        const likes = await Likes.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async checkAuth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getDataUser(req, res, next) {
        const {id} = req.params
        const user = await User.findOne(
            {
                where: {id}
            }
        )
        return res.json(user)
    }
}

module.exports = new UserController()