const ApiError = require('../errors/ApiErrors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket, Likes} = require('../models/models')
const uuid = require('uuid');
const path = require('path');

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

    async updateUserData(req, res) {
        try {
            const {id} = req.params;
            const {name, family, date_birthday, numberPhone} = req.body;

            await User.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        let newVal = {};
                        name ? newVal.name = name : false;
                        family ? newVal.family = family : false;
                        date_birthday ? newVal.date_birthday = date_birthday : false;
                        numberPhone ? newVal.numberPhone = numberPhone : false;

                        if(req.files) {
                            const {img} = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            img.mv(path.resolve(__dirname, '..', 'static_avatar', fileName));
                            newVal.img_user = fileName;
                        }

                        await User.update({
                            ...newVal
                        }, {where:{id}} ).then(() => {
                            return res.json("Пользователь обновлен");
                        })
                    } else {
                        return res.json("Этого Пользователя нет в базе данных!");
                    }
                })
            } catch (e) {
            return res.json(e);
        }
    }

}

module.exports = new UserController()