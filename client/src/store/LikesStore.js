import { makeAutoObservable } from "mobx";
import { deleteProductFromLikes } from "../http/likesAPI";

export default class LikesStoreStore {
  constructor() {
    this._totalPrice = 0;
    this._likes = [];
    makeAutoObservable(this);
  }

  async setDeleteItemLikes(product, isAuth = false) {
    if (isAuth) {
      await deleteProductFromLikes(product.id).then(() => {
        this._likes = this._likes.filter((item) => item.id !== product.id);
        this._totalPrice -= product.price * product.count;
      });
    } else {
      this._likes = this._likes.filter((item) => item.id !== product.id);
      this._totalPrice -= product.price * product.count;

      localStorage.setItem("likes", JSON.stringify(this._likes));
    }
  }

  setLikes(item, isAuth = false) {
    const checkProductInLikes = this._likes.findIndex(
      (product) => product.id === item.id
    );
    if (checkProductInLikes < 0) {
      this._likes = [...this._likes, { count: item.count || 1, ...item }];
      let totalPrice = 0;
      this._likes.forEach(
        (product) => (totalPrice += Number(product.price * product.count))
      );
      this._totalPrice = totalPrice;
    }

    if (!isAuth) {
      localStorage.setItem("likes", JSON.stringify(this._likes));
    }
  }

  setDeleteAllProductFromLikes() {
    this._totalPrice = 0;
    this._likes = [];
  }

  setCountProduct(productId, action, isAuth = false) {
    const itemInd = this._likes.findIndex((item) => item.id === productId);
    const itemInState = this._likes.find((product) => product.id === productId);
    if (action === "+") {
      const newItem = {
        ...itemInState,
        count: ++itemInState.count,
      };
      this._likes = [
        ...this._likes.slice(0, itemInd),
        newItem,
        ...this._likes.slice(itemInd + 1),
      ];
    } else {
      const newItem = {
        ...itemInState,
        count: itemInState.count === 1 ? 1 : --itemInState.count,
      };
      this._likes = [
        ...this._likes.slice(0, itemInd),
        newItem,
        ...this._likes.slice(itemInd + 1),
      ];
    }

    localStorage.setItem("likes", JSON.stringify(this._likes));

    let totalPrice = 0;
    this._likes.forEach(
      (product) => (totalPrice += Number(product.price * product.count))
    );
    this._totalPrice = totalPrice;
  }

  resetLikes() {
    this._likes = [];
    this._totalPrice = 0;
    localStorage.removeItem("likes");
  }

  get Likes() {
    return this._likes;
  }

  get Price() {
    return this._totalPrice;
  }
}
