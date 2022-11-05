import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import {
  fetchOneProduct,
  addProductToBasket,
  addRating,
  checkRating,
  getProductDescription,
} from "../../http/productAPI";
import { BASKET_ROUTE } from "../../utils/consts";
import { BsCheckLg } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import "./Simple.scss";
import RatingStars from "../../components/RatingStar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nav from "react-bootstrap/Nav";
import {
  createQuestion,
  fetchQuestion,
  fetchQuestionProduct,
} from "../../http/questionAPI";
import { fetchReviewsProduct } from "../../http/reviewsAPI";

const SimpleProduct = observer(() => {
  const { user, basket } = useContext(Context);

  const [product, setProduct] = useState({ info: [] });
  const { id } = useParams();

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
  }, []);

  const isProductInBasket = () => {
    const findProduct = basket.Basket.findIndex(
      (item) => Number(item.id) === Number(product.id)
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

  const [photoProduct, setProductPhoto] = useState(product.imgMain);

  //////////

  const [resRate, setResRate] = useState("");
  const [isAccessRating, setSsAccessRating] = useState(false);

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
    if (user.isAuth) {
      checkRating({ productId: id }).then((res) =>
        setSsAccessRating(res.allow)
      );
    }
  }, [id, resRate]);

  const ratingChanged = (rate) => {
    addRating({
      rate,
      productId: id,
    }).then((res) => {
      setResRate(res);
    });
  };

  ////

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const handleCloseQuestionModal = () => setShowQuestionModal(false);
  const handleShowQuestionModal = () => setShowQuestionModal(true);

  const [stateQuestion, setStateQuestion] = useState("");

  const createQuestionUser = () => {
    // id_product, id_user_question, text_question
    const formData = new FormData();
    formData.append("text_question", stateQuestion);
    formData.append("id_product", id);
    formData.append("id_user_question", user.user.id);
    createQuestion(formData).then((data) => setShowQuestionModal(false));
  };

  const [QA, setQA] = useState();

  useEffect(() => {
    fetchQuestionProduct({ id }).then((data) => setQA(data));
  }, [product]);

  const [reviews, setReviews] = useState();

  useEffect(() => {
    fetchReviewsProduct({ id }).then((data) => setReviews(data));
    console.log(reviews);
  }, [product]);

  return (
    <section class="product">
      <div class="product__photo">
        <div class="photo-container">
          <div
            class="photo-main"
            style={
              photoProduct
                ? {
                    backgroundImage: `url(${
                      process.env.REACT_APP_API_URL + photoProduct
                    })`,
                  }
                : {
                    backgroundImage: `url(${
                      process.env.REACT_APP_API_URL + product.imgMain
                    })`,
                  }
            }
          >
            {/* <div class="controls">
                        <i class="material-icons">share</i>
                        <i class="material-icons">favorite_border</i>
                    </div> */}
          </div>
          <div class="photo-album">
            <ul>
              <li>
                <img
                  src={process.env.REACT_APP_API_URL + product.imgMain}
                  onClick={() => setProductPhoto(product.imgMain)}
                />
              </li>
              <li>
                <img
                  src={process.env.REACT_APP_API_URL + product.imgFirst}
                  onClick={() => setProductPhoto(product.imgFirst)}
                />
              </li>
              <li>
                <img
                  src={process.env.REACT_APP_API_URL + product.imgSecond}
                  onClick={() => setProductPhoto(product.imgSecond)}
                />
              </li>
              <li>
                <img
                  src={process.env.REACT_APP_API_URL + product.imgThird}
                  onClick={() => setProductPhoto(product.imgThird)}
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="product__info">
        <div class="title">
          <h1>{product.name}s</h1>
          <span>Код товара: {product.id}</span>
        </div>
        <div class="price">
          <span>{product.price}</span> РУБ
        </div>
        {/* <div class="variant">
                <h3>SELECT A COLOR</h3>
                <ul>
                    <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png" alt="green apple"/></li>
                    <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302752/codepen/delicious-apples/yellow-apple.png" alt="yellow apple"/></li>
                    <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302427/codepen/delicious-apples/orange-apple.png" alt="orange apple"/></li>
                    <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302285/codepen/delicious-apples/red-apple.png" alt="red apple"/></li>
                </ul>
            </div> */}
        <div class="description">
          <h3>Рейтинг</h3>
          <RatingStars
            ratingChanged={ratingChanged}
            ratingVal={product?.rating || 0}
            isAuth={user.isAuth}
            isAccessRating={isAccessRating}
          />
        </div>
        <div class="description">
          <h3>Характеристики</h3>
          <ul>
            {product.info.map((info, index) => (
              <li key={index}>
                {info.title}: {info.description}
              </li>
            ))}
          </ul>
        </div>
        {isProductInBasket(product) ? (
          <Button
            class="buy--btn"
            variant="outline-danger"
            onClick={() => addProductInBasket(product)}
            disabled={!user.isAuth ? true : false}
          >
            <BsCartPlus /> Добавить в корзину
          </Button>
        ) : (
          <a href={BASKET_ROUTE}>
            <Button class="yes--buy--btn" variant="outline-success">
              <BsCheckLg /> Уже в корзине
            </Button>
          </a>
        )}
      </div>
      <div className="about_product">
        <Tabs
          defaultActiveKey="description"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="description" title="Описание">
            {<p>{product.description}</p>}
          </Tab>
          <Tab eventKey="characteristics" title="Характеристики">
            sdvsdv
          </Tab>
          <Tab eventKey="reviews" title="Отзывы">
            {reviews?.map((rew) => {
              return (
                <Card>
                  <b>
                    {rew.review.user.name} {rew.review.user.family}
                  </b>
                  <br />
                  {rew.img_reviews != "not img" ? (
                    <img
                      width={"10%"}
                      src={process.env.REACT_APP_API_URL + rew.img_reviews}
                    />
                  ) : (
                    <div></div>
                  )}
                  <br />
                  Отзыв: {rew.text_reviews}
                  <br />
                  Соответствие описанию: {rew.description_true ? "ДА" : "НЕТ"}
                  <br />
                  Соответствие размеру: {rew.size_true ? "ДА" : "НЕТ"}
                  <br />
                  Соответствие доставки: {rew.delivery_true ? "ДА" : "НЕТ"}
                </Card>
              );
            })}
          </Tab>
          <Tab eventKey="question" title="Вопросы">
            <Button onClick={handleShowQuestionModal}>
              Задать вопрос по товару
            </Button>
            <br />
            <br />

            {QA?.map((question) => {
              return (
                <>
                  <div className="question">
                    Вопрос: {question.question.question_text} (
                    {question.question.user.name}{" "}
                    {question.question.user.family})
                  </div>
                  <div className="answer">
                    Ответ: {question.answer.answer_text} (
                    {question.answer.user.name} {question.answer.user.family})
                  </div>
                  <br />
                </>
              );
            })}
          </Tab>
          <Tab eventKey="comment" title="Комментарии">
            dsvsdvdsv
          </Tab>
          <Tab eventKey="rating" title="Рейтинг">
            dsvsdvdsv
          </Tab>
        </Tabs>
      </div>

      <Modal show={showQuestionModal} onHide={handleCloseQuestionModal}>
        <Modal.Header closeButton>
          <Modal.Title>Задать вопрос...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Введите свой вопрос:
          <InputGroup>
            <Form.Control
              value={stateQuestion}
              as="textarea"
              onChange={(e) => setStateQuestion(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseQuestionModal}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={createQuestionUser}>
            Задать вопрос
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
});

export default SimpleProduct;
