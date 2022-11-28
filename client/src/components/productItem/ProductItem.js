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

  const isProductInBasket = (prod) => {
    const findProduct = basket.Basket.findIndex(
      (item) => Number(item.id) === Number(prod.id)
    );
    return findProduct < 0;
  };

  const isProductInLikes = (prod) => {
    const findProduct = likes.Likes.findIndex(
      (item) => Number(item.id) === Number(prod.id)
    );
    return findProduct < 0;
  };

  const addProductInBasket = (product) => {
    if (user.isAuth) {
      addProductToBasket(product).then(() => basket.setBasket(product, true));
    } else {
      basket.setBasket(product);
    }
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
    // <div class="product-card">
    //   <div class="badge">Hot</div>
    //   <div class="product-tumb">
    //     <img src={process.env.REACT_APP_API_URL + product.imgMain} alt="" />
    //   </div>
    //   <div class="product-details">
    //     <div className="d-flex justify-content-between">
    //       <div className="mb-2">
    //         <span class="product-catagory">{product.product_type.name}</span>
    //         <span class="product-catagory">{product.product_brand.name}</span>
    //       </div>
    //       <div className="d-flex align-items-center">
    //         {product.rating.toFixed(1)} <AiOutlineStar className="ml-1" />
    //       </div>
    //     </div>
    //     <h4>
    //       <a href={PRODUCT_ROUTE + "/" + product.id}>{product.name}</a>
    //     </h4>
    //     <div class="product-bottom-details">
    //       <div class="product-price">{product.price} РУБ</div>
    //       <div class="product-links">
    //         {isProductInBasket(productIn) ? (
    //           <Button
    //             variant="danger"
    //             onClick={() => addProductInBasket(productIn)}
    //             disabled={!user.isAuth ? true : false}
    //           >
    //             <BsCartPlus />
    //           </Button>
    //         ) : (
    //           <Button
    //             variant="success"
    //             href={BASKET_ROUTE}
    //             disabled={!user.isAuth ? true : false}
    //           >
    //             <BsCheckLg />
    //           </Button>
    //         )}
    //         {isProductInLikes(productIn) ? (
    //           <Button
    //             variant="primary"
    //             onClick={() => addProductInLikes(productIn)}
    //             disabled={!user.isAuth ? true : false}
    //           >
    //             <CgHeart />
    //           </Button>
    //         ) : (
    //           <Button
    //             variant="info"
    //             onClick={() => likes.setDeleteItemLikes(productIn, true)}
    //             disabled={!user.isAuth ? true : false}
    //           >
    //             <CgHeart />
    //           </Button>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
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
            {isProductInBasket(productIn) ? (
              <Button
                className="btn_cart_out"
                onClick={() => addProductInBasket(productIn)}
                disabled={!user.isAuth ? true : false}
              >
                <BsCartPlus />
              </Button>
            ) : (
              <Button
                className="btn_cart_in"
                href={BASKET_ROUTE}
                disabled={!user.isAuth ? true : false}
              >
                <BsCheckLg />
              </Button>
            )}
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
