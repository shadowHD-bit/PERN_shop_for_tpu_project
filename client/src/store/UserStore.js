import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._user = {}
        this._userProf = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setIsAdmin(bool) {
        this._isAdmin = bool
    }
    setUser(user) {
        this._user = user
    }
    setUserProf(userData) {
        this._userProf = userData
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }

    get userProf() {
        return this._userProf
    }

    get isAdmin() {
        return this._isAdmin
    }
}