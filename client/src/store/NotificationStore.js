import {makeAutoObservable} from "mobx";

export default class NotificationStore {
    constructor() {
        this._notification = []
        this._count = 0
        makeAutoObservable(this)
    }

    setNotification(notifications) {
        this._notification = notifications
    }

    setCount(count) {
        this._count = count
    }

    get notification() {
        return this._notification
    }

    get count() {
        return this._count
    }
}