import React from "react";
import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { BsCartPlus } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import { Context } from "../..";
import { addProductToBasket } from "../../http/productAPI";

const LikesItem = ({ product }) => {
  const { likes, basket, user } = useContext(Context);

  return (
    <div className="container">
      <Card className="d-flex flex-row justify-content-between align-items-center">
        <div class="product-thumbnail">
          <a href={`/product/${product.id}`}>
            <img
              src={process.env.REACT_APP_API_URL + product.imgMain}
              alt=""
              style={{ width: "100px" }}
            />
          </a>
        </div>
        <div className="product_name">{product.name}</div>
        <div className="product_price">{product.price} РУБ</div>
        <div className="btn-remove">
          <a>
            <GrClose onClick={() => likes.setDeleteItemLikes(product, true)} />
          </a>
        </div>
      </Card>
    </div>
  );
};

export default LikesItem;
