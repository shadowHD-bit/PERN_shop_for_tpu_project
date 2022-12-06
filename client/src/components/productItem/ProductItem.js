import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Button, Badge } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link, useNavigate } from "react-router-dom";
import { BASKET_ROUTE, LIKES_ROUTER, PRODUCT_ROUTE } from "../../utils/consts";
import { BsCartPlus } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";
import "./productItem.scss";
import { Context } from "../..";
import { addProductToBasket, fetchOneProduct } from "../../http/productAPI";
import { observer } from "mobx-react-lite";
import { AiOutlineStar } from "react-icons/ai";
import { addProductToLikes } from "../../http/likesAPI";
import { CgHeart } from "react-icons/cg";

const ProductItem = observer(({ product }) => {
  const { user, basket, likes } = useContext(Context);

  const isProductInLikes = (prod) => {
    const findProduct = likes.Likes.findIndex(
      (item) => Number(item.id) === Number(prod.id)
    );
    return findProduct < 0;
  };

  const addProductInLikes = (product) => {
    if (user.isAuth) {
      addProductToLikes(product).then(() => likes.setLikes(product, true));
    } else {
      likes.setLikes(product);
    }
  };

  const [productIn, setProductIn] = useState({ info: [] });

  useEffect(() => {
    fetchOneProduct(product.id).then((data) => setProductIn(data));
  }, []);

  return (
    <>
      <Col xs={12} md={6} xl={4} className="p-0">
        <Card className="product_card" style={{ boxShadow: "none" }}>
          <Card.Img
            variant="top"
            className="img_card"
            style={{ boxShadow: "none" }}
            src={process.env.REACT_APP_API_URL + product.imgMain}
          />
          <Card.Body style={{ boxShadow: "none", minHeight: "200px" }}>
            <Card.Text>
              {product.productBadgeId !== null ? (
                <Badge bg="danger">{product.product_badge.name_badge}</Badge>
              ) : (
                ""
              )}{" "}
              <Badge bg="danger">{product.product_brand.name}</Badge>{" "}
              <Badge bg="danger">{product.product_type.name}</Badge>{" "}
            </Card.Text>
            <Link to={PRODUCT_ROUTE + "/" + product.id}>
              <Card.Title className="title_card">{product.name}</Card.Title>
            </Link>
            <Card.Text className="price_card">{product.price} РУБ</Card.Text>
          </Card.Body>
          <Card.Footer style={{ boxShadow: "none" }}>
            {isProductInLikes(productIn) ? (
              <Button
                className="btn_like_out"
                onClick={() => addProductInLikes(productIn)}
                disabled={!user.isAuth ? true : false}
              >
                <CgHeart />
              </Button>
            ) : (
              <Button
                className="btn_like_in"
                onClick={() => likes.setDeleteItemLikes(productIn, true)}
                disabled={!user.isAuth ? true : false}
              >
                <CgHeart />
              </Button>
            )}
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
});

export default ProductItem;
