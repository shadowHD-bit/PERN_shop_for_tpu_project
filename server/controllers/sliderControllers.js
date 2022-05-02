const uuid = require('uuid');
const path = require('path');
const {Slider} = require('../models/models')
const ApiError = require('../errors/ApiErrors')

class SliderController{
    async createSlider(req, res, next) {
        try {
            let {title, text} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const slider = await Slider.create({title, text, img: fileName});

            return res.json(slider)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    
    }

    async getSliders(req, res) {
        let slides;
        slides = await Slider.findAll()
        return res.json(slides)
    }

    async getOneSlides(req, res) {
        const {id} = req.params
        const slide = await Slider.findOne(
            {
                where: {id},
            }
        )
        return res.json(slide)
    }

    async deleteSlide(req, res) {
        try {
            const {id} = req.params;
            await Slider.findOne({where: {id}})
                .then( async data => {
                    if(data) {
                        await Slider.destroy({where:{id}}).then(() => {
                            return res.json("Слайд удален");
                        })
                    } else {
                        return res.json("Этого слайда нет в базе данных...");
                    }
                })
        } catch (e) {
            return res.json(e);
        }
    }


    async updateSlide(req, res) {
        try {
            const {id} = req.params;
            const {text, title} = req.body;

            await Slider.findOne({where:{id}})
                .then( async data => {
                    if(data) {
                        let newVal = {};
                        title ? newVal.title = title : false;
                        text ? newVal.text = text : false;

                        if(req.files) {
                            const {img} = req.files;
                            const type = img.mimetype.split('/')[1];
                            let fileName = uuid.v4() + `.${type}`;
                            img.mv(path.resolve(__dirname, '..', 'static', fileName));
                            newVal.img = fileName;
                        }

                        await Slider.update({
                            ...newVal
                        }, {where:{id}} ).then(() => {
                            return res.json("Слайдер обновлен");
                        })
                    } else {
                        return res.json("Этого Слайдера нет в базе данных!");
                    }
                })
            } catch (e) {
            return res.json(e);
        }
    }

}

module.exports = new SliderController()