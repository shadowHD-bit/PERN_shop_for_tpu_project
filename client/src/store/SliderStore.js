import {makeAutoObservable} from "mobx";

export default class SliderStore {
    constructor() {
        this._sliders = []
        this._selectedSlider = {}
        makeAutoObservable(this)
    }

    setSlider(sliders) {
        this._sliders = sliders
    }

    setSliderInAdmin(slider) {
        this._selectedSlider = slider
    }

   
    get sliders() {
        return this._sliders
    }

    get selectedSlider() {
        return this._selectedSlider
    }

}