import React, { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Context } from "../../index";
import "./BasketCard.scss";
import { GrClose } from "react-icons/gr";
import {
  changeCountProductBasket,
  deleteProductFromBasket,
  fetchSizes,
  getProductFromBasket,
} from "../../http/productAPI";
import { useState } from "react";

const OneItemInBasket = ({ product, reRender, reRenderPrice }) => {
  const { basket } = useContext(Context);

  const [sizes, setSizes] = useState([
    { id: product.sizeId, number_size: "0" },
  ]);

  useEffect(() => {
    fetchSizes().then((data) => {
      setSizes(data.rows);
    });
  }, []);

  const deleteItemBasket = () => {
    const formData = new FormData();
    formData.append("size_product", product.sizeId);
    deleteProductFromBasket(product.id, formData).then((data) => {
      reRender();
      reRenderPrice();
      basket.setCount(basket._count - 1)
    });
  };


  const [count, setCount] = useState(product.count);

  const changeCountProduct = (action) => {
    const formData = new FormData();
    formData.append("id", product.id);
    formData.append("action", action);
    formData.append("sizeId", product.sizeId);

    changeCountProductBasket(formData).then((data) => {
      if (action == "+") {
        setCount((prev) => prev + 1);
        reRenderPrice();
      } else if (action == "-") {
        setCount((prev) => prev - 1);
        reRenderPrice();
      }
    });
  };

  return (
    <tr>
      <td className="product-thumbnail">
        <a href={`/product/${product.id}`}>
          <img
            src={process.env.REACT_APP_API_URL + product.imgMain}
            alt=""
            style={{ width: "100px" }}
          />
        </a>
      </td>
      <td className="product-name">
        <a href={`/product/${product.id}`}>{product.name}</a>
      </td>
      <td className="product-price">
        <span className="amount">
          {
            sizes[sizes.findIndex((item) => item.id == product.sizeId)]
              .number_size
          }
        </span>
      </td>
      <td className="product-price">
        <span className="amount">{product.price} РУБ</span>
      </td>
      <td className="product-quantity">
        <Button
          variant="outline-dark"
          onClick={() => changeCountProduct("+")}
          disabled={count == 9 ? true : false}
        >
          +
        </Button>
        <span className="counter">{count}</span>
        <Button
          variant="outline-dark"
          onClick={() => changeCountProduct("-")}
          disabled={count == 1 ? true : false}
        >
          -
        </Button>
      </td>
      <td className="product-subtotal">{product.price * count} РУБ</td>
      <td className="product-remove">
        <a>
          <GrClose onClick={() => deleteItemBasket()} />
        </a>
      </td>
    </tr>
  );
};

export default OneItemInBasket;
