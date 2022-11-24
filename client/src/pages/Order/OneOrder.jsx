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
import { Context } from "../..";
import { getOneOrderProducts } from "../../http/orderAPI";
import { fetchOneProduct, fetchProduct } from "../../http/productAPI";
import { createReviews } from "../../http/reviewsAPI";
import { ORDERS_ROUTE, PRODUCT_ROUTE, SHOP_ROUTE } from "../../utils/consts";

const OneOrder = ({ id, complete, createdAt, updatedAt, reRender }) => {
  const [modalDelete, setShowDelete] = useState(false);
  const [modalReview, setShowReview] = useState(false);
  const [productInfo, setProductInfo] = useState([]);

  const user = useContext(Context);

  //modal info
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => {
    setShowDelete(true);
  };

  //modal delete
  const handleCloseReviews = () => setShowReview(false);
  const handleShowReviews = (prodId) => {
    setShowReview(true);
    setProductId(prodId);
  };

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

  const [descriptionTrueState, setDescriptionTrueState] = useState(true);
  const [sizeTrueState, setSizeTrueState] = useState(true);
  const [deliveryTrueState, setDeliveryTrueState] = useState(true);
  const [productId, setProductId] = useState();
  const [rating, setRating] = useState(3);

  const [reviewText, setReviewText] = useState();
  const [fileReview, setFileReview] = useState(null);
  const selectFileReview = (e) => {
    setFileReview(e.target.files[0]);
  };


  const createReviewsInModal = () => {
    const formData = new FormData();
    formData.append("text_review", reviewText);
    formData.append("img_reviews", fileReview);
    formData.append("description_true", descriptionTrueState);
    formData.append("size_true", sizeTrueState);
    formData.append("delivery_true", deliveryTrueState);
    formData.append("product_id", productId);
    formData.append("rate", rating);
    formData.append("user_id", user.user.user.id);
    createReviews(formData).then((data) => {
      handleCloseReviews();
    });
  };

  return (
    <>
      <ListGroup.Item className="mt-3" key={id}>
        <Row>
          <Col md={6}>
            <Row>
              <Col xs={12}>
                <NavLink to={ORDERS_ROUTE + `/${id}`}>
                  Номер заказа: {id}
                </NavLink>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>Дата создания заказа: {formatDate(createdAt)}</Col>
            </Row>
            {complete ? (
              <Row>
                <Col xs={12}>
                  Дата завершения заказа: {formatDate(updatedAt)}
                </Col>
              </Row>
            ) : (
              false
            )}
            <Row>
              <Col xs={12}>
                Статус заказа: {complete ? "Завершен" : "В пути"}
              </Col>
            </Row>
          </Col>
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Button
              variant="outline-success"
              onClick={() => handleShowDelete()}
            >
              Подробности заказа
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>

      <Modal
        show={modalDelete}
        onHide={handleCloseDelete}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Информационное окно
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Информация о заказе (Номер заказа: {id})
          <br />
          <br />
          {productInfo.prod?.map((item) => {
            return (
              <Card className="mt-2">
                <Row>
                  <Col md={2}>
                    <img
                      style={{ width: "100%" }}
                      src={process.env.REACT_APP_API_URL + item.descr.imgMain}
                      alt=""
                    />
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <ul style={{ listStyle: "none" }}>
                      <li>Номер товара: {item.descr.id}</li>
                      <li>Имя товара: {item.descr.name}</li>
                      <li>Цена товара: {item.descr.price} РУБ</li>
                      <li>Количество: {item.count}</li>
                    </ul>
                  </Col>
                  <Col className="d-flex justify-content-center align-items-center">
                    <a
                      style={{
                        padding: "5px 20px",
                        border: "1px solid red",
                        color: "red",
                        textDecoration: "none",
                        borderRadius: "10px",
                      }}
                      href={PRODUCT_ROUTE + "/" + item.descr.id}
                    >
                      Просмотреть товар
                    </a>
                    {complete ? (
                      <Button
                        variant="outline-danger"
                        onClick={() => handleShowReviews(item.descr.id)}
                        className="ml-3"
                      >
                        Оставить отзыв
                      </Button>
                    ) : (
                      <div></div>
                    )}
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalReview}
        onHide={handleCloseReviews}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        size="xl"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Информационное окно
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Создание отзыва товара (Номер заказа: {id})
          <br />
          Введите свой отзыв:
          <Form.Control
            as="textarea"
            aria-label="With textarea"
            onChange={(e) => setReviewText(e.target.value)}
          />
          <br />
          Добавить изображение:
          <Form.Control type="file" onChange={selectFileReview} />
          <br />
          <Rating
            name="size-large"
            defaultValue={rating || 3}
            value={rating || 3}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            size="large"
          />
          <br />
          Соответствует товар описанию?
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setDescriptionTrueState(e.target.value)}
          >
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </Form.Select>
          <br />
          Соответствует товар по размеры?
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setSizeTrueState(e.target.value)}
          >
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </Form.Select>
          <br />
          Соответствует доставка описанию?
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setDeliveryTrueState(e.target.value)}
          >
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseReviews}>
            Закрыть
          </Button>
          <Button variant="success" onClick={() => createReviewsInModal()}>
            Добавить отзыв
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default OneOrder;
