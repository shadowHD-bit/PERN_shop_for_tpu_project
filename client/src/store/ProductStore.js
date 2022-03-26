import {makeAutoObservable} from "mobx";

export default class ProductStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Рубашки'},
            {id: 2, name: 'Штаны'},
            {id: 3, name: 'Майки'},
            {id: 4, name: 'Брюки'},
        ]
        this._brands = [
            {id: 1, name: 'Adidas'},
            {id: 2, name: 'Nile'},
            {id: 3, name: 'H&M'},
            {id: 4, name: 'CROPP'},
        ]
        this._products = [
            {id: 1, name: 'Брюки Adidas', price: 2500, rating: 5, imgMain: 'https://b.allegroimg.com/original/033708/41fe4477451aa5a5b407984d754b/Spodnie-treningowe-ADIDAS-REGISTA-18-size-S'},
            {id: 2, name: 'Брюки Adidas', price: 2500, rating: 5, imgMain: 'https://b.allegroimg.com/original/033708/41fe4477451aa5a5b407984d754b/Spodnie-treningowe-ADIDAS-REGISTA-18-size-S'},
            {id: 3, name: 'Брюки Adidas', price: 2500, rating: 5, imgMain: 'https://b.allegroimg.com/original/033708/41fe4477451aa5a5b407984d754b/Spodnie-treningowe-ADIDAS-REGISTA-18-size-S'},
            {id: 4, name: 'Брюки Adidas', price: 2500, rating: 5, imgMain: 'https://b.allegroimg.com/original/033708/41fe4477451aa5a5b407984d754b/Spodnie-treningowe-ADIDAS-REGISTA-18-size-S'},
            {id: 5, name: 'Брюки Adidas', price: 2500, rating: 5, imgMain: 'https://b.allegroimg.com/original/033708/41fe4477451aa5a5b407984d754b/Spodnie-treningowe-ADIDAS-REGISTA-18-size-S'},
            {id: 6, name: 'Брюки Adidas', price: 2500, rating: 5, imgMain: 'https://b.allegroimg.com/original/033708/41fe4477451aa5a5b407984d754b/Spodnie-treningowe-ADIDAS-REGISTA-18-size-S'},
            {id: 7, name: 'Брюки Adidas', price: 2500, rating: 5, imgMain: 'https://b.allegroimg.com/original/033708/41fe4477451aa5a5b407984d754b/Spodnie-treningowe-ADIDAS-REGISTA-18-size-S'},

        ]
        this._selectedType = {}
        this._selectedBrand = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 3
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setProduct(products) {
        this._products = products
    }

    setSelectedType(type) {
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand) {
        this.setPage(1)
        this._selectedBrand = brand
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get brands() {
        return this._brands
    }
    get products() {
        return this._products
    }
    get selectedType() {
        return this._selectedType
    }
    get selectedBrand() {
        return this._selectedBrand
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
}