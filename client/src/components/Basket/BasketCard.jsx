import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import OneItemInBasket from "./OneItemBasket";
import { Context } from "../..";
import "./BasketCard.scss";
import { CHECKOUTING_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { useState } from "react";
import { getProductFromBasket } from "../../http/productAPI";
import { useEffect } from "react";
import { fetchOneCoupon } from "../../http/couponAPI";
import AddOrderDetails from "../modals/AddOrderDetails";

const BasketCard = observer(() => {
  //const { basket } = useContext(Context);

  const [stateModal, setStateModal] = useState(false);

  const handleShow = () => {
    setStateModal(true);
  };
  const handleClose = () => {
    setStateModal(false);
  };

  const [orderPrice, setOrderPrice] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(0);
  const [sale, setSale] = useState(1);

  const [couponText, setCouponText] = useState("");

  const [paymentDelivery, setPaymentDelivery] = useState(false);

  const setDeliveryPayment = (bool) => {
    setPaymentDelivery((e) => !e);

    if (paymentDelivery == false) {
      setDeliveryPrice(600);
    } else {
      setDeliveryPrice(0);
    }
  };

  useEffect(() => {
    setOrderPrice((totalPrice + deliveryPrice) * sale);
  }, [deliveryPrice, sale]);

  const checkCoupon = () => {
    if (couponText.length != 0) {
      fetchOneCoupon(couponText).then((data) => {
        if (data) {
          setSale(1 - data.discount_percentage / 100);
        } else {
          setSale(1);
        }
      });
    }
  };

  const [basket, setBasket] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    getProductFromBasket().then((data) => {
      setBasket(data);
      const total =
        data.length !== 1
          ? data.reduce((a, c) => (a += c.price * c.count), 0)
          : data[0].price * data[0].count;
      setTotalPrice(total);
      setOrderPrice((total + deliveryPrice) * sale);
    });
  }, []);

  const [rerender, setRerender] = useState(false);
  const [rerenderPrice, setRerenderPrice] = useState(false);

  const getTotalPrice = () => {
    const total =
      basket.length !== 1
        ? basket.reduce((a, c) => (a += c.price * c.count), 0)
        : basket[0].price * basket[0].count;
    setTotalPrice(total);
    setOrderPrice((total + deliveryPrice) * sale);
  };

  useEffect(() => {
    getProductFromBasket().then((data) => {
      setBasket(data);
    });
    getTotalPrice();
  }, [rerender]);

  useEffect(() => {
    if (basket.length !== 0) {
      getProductFromBasket().then((data) => {
        setBasket(data);
        const total =
          data.length !== 1
            ? data.reduce((a, c) => (a += c.price * c.count), 0)
            : data[0].price * data[0].count;
        setTotalPrice(total);
        setOrderPrice((total + deliveryPrice) * sale);
      });
      getTotalPrice();
    }
  }, [rerenderPrice]);

  const reRender = () => {
    setRerender(!rerender);
  };

  const reRenderPrice = () => {
    setRerenderPrice(!rerenderPrice);
  };

  const sortFunc = (a, b) => {
    var aname = a.name;
    var bname = b.name;
    var asize = a.sizeId;
    var bsize = b.sizeId;

    if (aname == bname) {
      return asize < bsize ? -1 : asize > bsize ? 1 : 0;
    } else {
      return aname < bname ? -1 : 1;
    }
  };

  if (basket.length == 0) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <Image
          src={process.env.PUBLIC_URL + "/img/basket/basketEmpty.png"}
          width="200"
        />
        <div
          className="text-center mt-5"
          style={{ fontSize: 28, marginBottom: 200 }}
        >
          <b>Ваша корзина покупок сейчас пустая...</b>
        </div>
      </div>
    );
  }

  return (
    <>
      <div class="entry-header-area">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="entry-header">
                <h1 class="entry-title mt-3 mb-3">Корзина покупок</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-main-area">
        <div class="container">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <form action="#">
                <div class="table-content table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th class="product-thumbnail">Изображение</th>
                        <th class="product-name">Наименование</th>
                        <th class="product-price">Размер</th>
                        <th class="product-price">Цена</th>
                        <th class="product-quantity">Количество</th>
                        <th class="product-subtotal">Итоговая стоимость</th>
                        <th class="product-remove">Удалить</th>
                      </tr>
                    </thead>
                    <tbody>
                      {basket
                        .sort((a, b) => sortFunc(a, b))
                        .map((product) => (
                          <OneItemInBasket
                            key={product.id + product.sizeId}
                            product={product}
                            reRender={reRender}
                            reRenderPrice={reRenderPrice}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
                {/* <div class="row">
                  <div class="col-md-8 col-sm-7 col-xs-12">
                    <div class="coupon">
                      <h3>КУПОН</h3>
                      <p>
                        Если у вас есть купон, можете указать его и получить
                        скидку.
                      </p>
                      <input type="text" placeholder="Введите купон" />
                      <input type="submit" value="Применить купон" />
                    </div>
                  </div>
                  <div class="col-md-4 col-sm-5 col-xs-12">
                    <div class="cart_totals">
                      <h2>Итоговая стоимость</h2>
                      <table>
                        <tbody>
                          <tr class="cart-subtotal">
                            <th>Покупки:</th>
                            <td>
                              <span class="amount">{totalPrice} РУБЛЕЙ</span>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Платная доставка"
                              />
                            </td>
                          </tr>
                          <tr class="shipping">
                            <th>Доставка:</th>
                            <td>
                              <strong>
                                <span class="amount">{deliveryPrice} РУБЛЕЙ</span>
                              </strong>{" "}
                            </td>
                          </tr>
                          <tr class="order-total">
                            <th>Итог:</th>
                            <td>
                              <strong>
                                <span class="amount">{orderPrice} РУБЛЕЙ</span>
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="wc-proceed-to-checkout">
                        <a
                          onClick={() =>
                            (window.location.href = CHECKOUTING_ROUTE)
                          }
                        >
                          Купить
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
                <Row>
                  <Col xs={12} md={6}>
                    <Row>
                      <Col>
                        <div class="coupon">
                          <h3>КУПОН</h3>
                          <p>
                            Если у вас есть купон, можете указать его и получить
                            скидку.
                          </p>
                          <input
                            type="text"
                            value={couponText}
                            placeholder="Введите купон"
                            onChange={(e) => setCouponText(e.target.value)}
                          />
                          <Button
                            variant="outline-danger"
                            onClick={() => checkCoupon()}
                          >
                            Применить купон
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} md={6}>
                    <Row>
                      <h2>Итоговая стоимость</h2>
                    </Row>
                    <hr />

                    <Row>
                      <Col>Сумма покупок:</Col>
                      <Col className="d-flex justify-content-end">
                        <span class="amount">{totalPrice} РУБЛЕЙ</span>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Row className="pl-4">
                        <Form.Check
                          type="switch"
                          id="custom-switch"
                          label="Платная доставка"
                          value={paymentDelivery}
                          onChange={(e) => setDeliveryPayment(e.target.value)}
                        />
                      </Row>
                      <Row className="pr-0">
                        <Col>Доставка:</Col>
                        <Col className="d-flex justify-content-end">
                          <span class="amount">{deliveryPrice} РУБЛЕЙ</span>
                        </Col>
                      </Row>
                    </Row>
                    <hr />
                    <Row>
                      <Col>Скидка:</Col>
                      <Col className="d-flex justify-content-end">
                        <span class="amount">
                          {" "}
                          {sale == 1 ? 0 : 100 - sale * 100} %
                        </span>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col>Итоговая сумма:</Col>
                      <Col className="d-flex justify-content-end">
                        <span class="amount">
                          {orderPrice.toFixed(1)} РУБЛЕЙ
                        </span>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Button variant="danger" onClick={() => handleShow()}>
                        Купить
                      </Button>
                    </Row>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </div>
      </div>

      <AddOrderDetails show={stateModal} onHide={handleClose} sale={sale} payment_delivery={paymentDelivery} total_price={orderPrice}/>
    </>
  );
});

export default BasketCard;
