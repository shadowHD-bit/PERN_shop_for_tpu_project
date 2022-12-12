import { Rating } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Modal,
  NavLink,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../..";
import { CreateReview } from "../../components/modals/CreateReview";
import DetailsOrder from "../../components/modals/DetailOrder";
import DetailsPostedReview from "../../components/modals/DetailPostedReview";
import DetailsReview from "../../components/modals/DetailsReview";
import { getOneOrderProducts } from "../../http/orderAPI";
import { fetchOneProduct, fetchProduct } from "../../http/productAPI";
import { createReviews } from "../../http/reviewsAPI";
import { ORDERS_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE } from "../../utils/consts";

const OneOrder = ({ id, complete, createdAt, updatedAt, reRender }) => {
  const [modalReview, setShowReview] = useState(false);
  const [productInfo, setProductInfo] = useState([]);

  const [pickedSize, setPickedSize] = useState("");
  const [pickedReview, setPickedReview] = useState([]);

  //modal delete
  const handleCloseReviews = () => setShowReview(false);
  const handleShowReviews = (prodId, size) => {
    setShowReview(true);
    setProductId(prodId);
    setPickedSize(size);
  };

  const [modalDetail, setShowDetail] = useState(false);
  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => {
    setShowDetail(true);
  };

  const [modalPostedReview, setShowPostedReview] = useState(false);
  const handleClosePostedReviews = () => setShowPostedReview(false);
  const handleShowPostedReviews = (review) => {
    setShowPostedReview(true);
    setPickedReview(review)
  };
  console.log(productInfo);

  useEffect(() => {
    getOneOrderProducts(id).then((data) => setProductInfo(data));
  }, []);

  //Format date (createdAt)
  const formatDate = (propsDate) => {
    const date = new Date(Date.parse(propsDate));
    const options = {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timezone: "UTC",
    };
    return date.toLocaleString("en-US", options);
  };

  const [productId, setProductId] = useState();

  return (
    <>
      <Card className="mt-1 p-0 one_order" key={id}>
        <Card.Header className="order_item_header">
          <Row>
            <Col xs={6}>Номер заказа: {id}</Col>
            <Col xs={6} className="d-flex flex-row justify-content-end">
              <a onClick={() => handleShowDetail()} className="detail_link">Детали заказа</a>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            {productInfo.prod?.map((item) => {
              return (
                <div className="mb-1 row_item_product col-md-12 col-xl-6">
                  <div>
                    <img
                      className="img_item"
                      src={process.env.REACT_APP_API_URL + item.descr.imgMain}
                      alt=""
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <ul style={{ listStyle: "none" }}>
                      <li className="item_product_name">
                        <Link to={PRODUCT_ROUTE + "/" + item.descr.id}>
                          {item.descr.name}
                        </Link>
                      </li>
                      <li className="params_item">
                        Номер товара: {item.descr.id}
                      </li>
                      <li className="params_item">
                        Цена товара: {item.descr.price} РУБ
                      </li>
                      <li className="params_item">Размер: {item.size}</li>
                      <li className="params_item">Количество: {item.count}</li>
                      <li>
                        {complete && item.descr.reviews_products.length == 0 ? (
                          <a
                            className="params_item_btn"
                            onClick={() =>
                              handleShowReviews(item.descr.id, item.size)
                            }
                          >
                            Оставить отзыв
                          </a>
                        ) : (
                          item.descr.reviews_products.length != 0 ? 
                          <a
                          className="params_item_btn"
                          onClick={() =>
                            handleShowPostedReviews(item.descr.reviews_products)
                          }
                        >
                          Просмотреть отзыв
                        </a>
                          :

                          <div></div>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </Row>
        </Card.Body>
        <Card.Footer className="order_item_footer">
          <Row>
            <Col xs={4}>Статус заказа: {complete ? "Завершен" : "В пути"}</Col>
            <Col xs={4}>Дата создания заказа: {formatDate(createdAt)}</Col>
            <Col xs={4}>
              {" "}
              {complete ? (
                <Row>
                  <Col xs={12}>
                    Дата завершения заказа: {formatDate(updatedAt)}
                  </Col>
                </Row>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Card.Footer>
      </Card>

      <CreateReview
        reRender={reRender}
        productId={productId}
        size={pickedSize}
        modalReview={modalReview}
        handleCloseReviews={handleCloseReviews}
      />

      <DetailsOrder show={modalDetail} handleClose={handleCloseDetail} detail={productInfo.detail} />
      <DetailsPostedReview show={modalPostedReview} handleClose={handleClosePostedReviews} review={pickedReview} />
    </>
  );
};
export default OneOrder;
