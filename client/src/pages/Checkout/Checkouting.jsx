import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { sendOrder } from "../../http/orderAPI";
import { CHECKOUT_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import "./Checkouting.scss";

const Checkouting = () => {

    const {basket, user} = useContext(Context);
    const history = useNavigate()


    const buy = () => {
        let order = {
            basket: basket.Basket
        }

        if(user.isAuth) {
            order.auth = true;
        }

        sendOrder(order).then(data => {
            basket.Basket.map(item => {
                basket.setDeleteItemBasket(item, true)
            })
            basket.setDeleteAllProductFromBasket();
            localStorage.removeItem('basket')
            window.location.href = (CHECKOUT_ROUTE)
        });
    }


  return (
    <div className="checkouting">
      <div class="checkout">
        <div class="credit-card-box">
          <div class="flip">
            <div class="front">
              <div class="chip"></div>
              <div class="logo"></div>
              <div class="number"></div>
              <div class="card-holder">
                <label>Card holder</label>
                <div></div>
              </div>
              <div class="card-expiration-date">
                <label>Expires</label>
                <div></div>
              </div>
            </div>
            <div class="back">
              <div class="strip"></div>
              <div class="logo"></div>
              <div class="ccv">
                <label>CCV</label>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <form class="form">
          <fieldset>
            <label for="card-number">Card Number</label>
            <input
              type="num"
              id="card-number"
              class="input-cart-number"
              maxlength="4"
            />
            <input
              type="num"
              id="card-number-1"
              class="input-cart-number"
              maxlength="4"
            />
            <input
              type="num"
              id="card-number-2"
              class="input-cart-number"
              maxlength="4"
            />
            <input
              type="num"
              id="card-number-3"
              class="input-cart-number"
              maxlength="4"
            />
          </fieldset>
          <fieldset>
            <label for="card-holder">Card holder</label>
            <input type="text" id="card-holder" />
          </fieldset>
          <fieldset class="fieldset-expiration">
            <label for="card-expiration-month">Expiration date</label>
            <div class="select">
              <select id="card-expiration-month">
                <option></option>
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
            <div class="select">
              <select id="card-expiration-year">
                <option></option>
                <option>2016</option>
                <option>2017</option>
                <option>2018</option>
                <option>2019</option>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
                <option>2023</option>
                <option>2024</option>
                <option>2025</option>
              </select>
            </div>
          </fieldset>
          <fieldset class="fieldset-ccv">
            <label for="card-ccv">CCV</label>
            <input type="text" id="card-ccv" maxlength="3" />
          </fieldset>
        </form>
        <button class="btn" onClick={buy}>Оплатить</button>
      </div>
    </div>
  );
}


export default Checkouting