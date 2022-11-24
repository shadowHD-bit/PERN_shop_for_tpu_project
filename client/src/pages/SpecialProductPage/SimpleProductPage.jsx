import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Modal,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "../..";
import {
  fetchOneProduct,
  addProductToBasket,
  getProductDescription,
} from "../../http/productAPI";
import { BASKET_ROUTE } from "../../utils/consts";
import { BsCheckLg, BsHeart } from "react-icons/bs";
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
  getBoolUserUnCompleteQuestion,
} from "../../http/questionAPI";
import { fetchReviewsProduct } from "../../http/reviewsAPI";
import ReviewUI from "../../components/UI/Review/ReviewUI";
import { addProductToLikes } from "../../http/likesAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import QuestionModal from "../../components/UI/Modals/AddQuestionModal/QuestionModal";
import ErrorAuthModalQuestion from "../../components/UI/Modals/ErrorAuthModalQuestion/ErrorAuthModalQuestion";
import ErrorAddQuestionModal from "../../components/UI/Modals/ErrorAddQuestionModal/ErrorAddQuestionModal";
import { Rating } from "@material-ui/lab";

const SimpleProduct = observer(() => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { user, basket, likes } = useContext(Context);

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

  const isProductInLikes = () => {
    const findProduct = likes.Likes.findIndex(
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

  const addProductInLikes = (product) => {
    if (user.isAuth) {
      addProductToLikes(product).then(() => likes.setLikes(product, true));
    } else {
      likes.setLikes(product);
    }
  };

  const [photoProduct, setProductPhoto] = useState(product.imgMain);

  //////////

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
  }, [id]);

  ////

  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleCloseErrorModal = () => setShowErrorModal(false);
  const handleShowErrorModal = () => setShowErrorModal(true);

  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const handleCloseQuestionModal = () => setShowQuestionModal(false);
  const handleShowQuestionModal = () => {
    if (user.isAuth) {
      getBoolUserUnCompleteQuestion({ id: user.user.id, product_id: id }).then(
        (data) => {
          console.log(data);
          if (data) {
            handleShowErrorModal();
          } else {
            setShowQuestionModal(true);
          }
        }
      );
    } else {
      handleShowErrorAuthModal();
    }
  };

  const [showErrorAuthModal, setShowErrorAuthModal] = useState(false);
  const handleCloseErrorAuthModal = () => setShowErrorAuthModal(false);
  const handleShowErrorAuthModal = () => setShowErrorAuthModal(true);

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
  }, [product]);

  return (
    // <section class="product">
    //   <div class="product__photo">
    //     <div class="photo-container">
    //       <div
    //         class="photo-main"
    //         style={
    //           photoProduct
    //             ? {
    //                 backgroundImage: `url(${
    //                   process.env.REACT_APP_API_URL + photoProduct
    //                 })`,
    //               }
    //             : {
    //                 backgroundImage: `url(${
    //                   process.env.REACT_APP_API_URL + product.imgMain
    //                 })`,
    //               }
    //         }
    //       >
    //         {/* <div class="controls">
    //                     <i class="material-icons">share</i>
    //                     <i class="material-icons">favorite_border</i>
    //                 </div> */}
    //       </div>
    //       <div class="photo-album">
    //         <ul>
    //           <li>
    //             <img
    //               src={process.env.REACT_APP_API_URL + product.imgMain}
    //               onClick={() => setProductPhoto(product.imgMain)}
    //             />
    //           </li>
    //           <li>
    //             <img
    //               src={process.env.REACT_APP_API_URL + product.imgFirst}
    //               onClick={() => setProductPhoto(product.imgFirst)}
    //             />
    //           </li>
    //           <li>
    //             <img
    //               src={process.env.REACT_APP_API_URL + product.imgSecond}
    //               onClick={() => setProductPhoto(product.imgSecond)}
    //             />
    //           </li>
    //           <li>
    //             <img
    //               src={process.env.REACT_APP_API_URL + product.imgThird}
    //               onClick={() => setProductPhoto(product.imgThird)}
    //             />
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    //   <div class="product__info">
    //     <div class="title">
    //       <h1>{product.name}s</h1>
    //       <span>Код товара: {product.id}</span>
    //     </div>
    //     <div class="price">
    //       <span>{product.price}</span> РУБ
    //     </div>
    //     {/* <div class="variant">
    //             <h3>SELECT A COLOR</h3>
    //             <ul>
    //                 <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302064/codepen/delicious-apples/green-apple2.png" alt="green apple"/></li>
    //                 <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302752/codepen/delicious-apples/yellow-apple.png" alt="yellow apple"/></li>
    //                 <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302427/codepen/delicious-apples/orange-apple.png" alt="orange apple"/></li>
    //                 <li><img src="https://res.cloudinary.com/john-mantas/image/upload/v1537302285/codepen/delicious-apples/red-apple.png" alt="red apple"/></li>
    //             </ul>
    //         </div> */}
    //     <div class="description">
    //       <h3>Рейтинг</h3>
    //       <RatingStars
    //         ratingChanged={ratingChanged}
    //         ratingVal={product?.rating || 0}
    //         isAuth={user.isAuth}
    //         isAccessRating={isAccessRating}
    //       />
    //     </div>
    //     <div class="description">
    //       <h3>Характеристики</h3>
    //       <ul>
    //         {product.info.map((info, index) => (
    //           <li key={index}>
    //             {info.title}: {info.description}
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //     {isProductInBasket(product) ? (
    //       <Button
    //         class="buy--btn"
    //         variant="outline-danger"
    //         onClick={() => addProductInBasket(product)}
    //         disabled={!user.isAuth ? true : false}
    //       >
    //         <BsCartPlus /> Добавить в корзину
    //       </Button>
    //     ) : (
    //       <a href={BASKET_ROUTE}>
    //         <Button class="yes--buy--btn" variant="outline-success">
    //           <BsCheckLg /> Уже в корзине
    //         </Button>
    //       </a>
    //     )}
    //   </div>
    //   <div className="about_product">
    //     <Tabs
    //       defaultActiveKey="description"
    //       id="justify-tab-example"
    //       className="mb-3"
    //       justify
    //     >
    //       <Tab eventKey="description" title="Описание">
    //         {<p>{product.description}</p>}
    //       </Tab>
    //       <Tab eventKey="characteristics" title="Характеристики">
    //         sdvsdv
    //       </Tab>
    //       <Tab eventKey="reviews" title="Отзывы">
    //         {reviews?.map((rew) => {
    //           return (
    //             <ReviewUI name_user={rew.review.user.name}
    //             family_user={rew.review.user.family}
    //             // img_user={}
    //             text_review={rew.text_reviews}
    //             img_review={rew.img_reviews}
    //             description_true={rew.description_true}
    //             size_true={rew.size_true}
    //             delivery_true={rew.delivery_true} />
    //           );
    //         })}
    //       </Tab>
    //       <Tab eventKey="question" title="Вопросы">
    //         <Button onClick={handleShowQuestionModal}>
    //           Задать вопрос по товару
    //         </Button>
    //         <br />
    //         <br />

    //         {QA?.map((question) => {
    //           return (
    //             <>
    //               <div className="question">
    //                 Вопрос: {question.question.question_text} (
    //                 {question.question.user.name}{" "}
    //                 {question.question.user.family})
    //               </div>
    //               <div className="answer">
    //                 Ответ: {question.answer.answer_text} (
    //                 {question.answer.user.name} {question.answer.user.family})
    //               </div>
    //               <br />
    //             </>
    //           );
    //         })}
    //       </Tab>
    //       <Tab eventKey="comment" title="Комментарии">
    //         dsvsdvdsv
    //       </Tab>
    //       <Tab eventKey="rating" title="Рейтинг">
    //         dsvsdvdsv
    //       </Tab>
    //     </Tabs>
    //   </div>
    <>
      <Container className="product_container">
        <Row>
          <Col xs={12} md={12} xl={6} className="slider_product">
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              <SwiperSlide>
                <img src={process.env.REACT_APP_API_URL + product.imgMain} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={process.env.REACT_APP_API_URL + product.imgFirst} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={process.env.REACT_APP_API_URL + product.imgSecond} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={process.env.REACT_APP_API_URL + product.imgThird} />
              </SwiperSlide>
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              <SwiperSlide>
                <img src={process.env.REACT_APP_API_URL + product.imgMain} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={process.env.REACT_APP_API_URL + product.imgFirst} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={process.env.REACT_APP_API_URL + product.imgSecond} />
              </SwiperSlide>
              <SwiperSlide>
                <img src={process.env.REACT_APP_API_URL + product.imgThird} />
              </SwiperSlide>
            </Swiper>
          </Col>
          <Col xs={12} md={12} xl={6} className="main_info_product">
            <Row>
              <p className="title_product">{product.name}</p>
              <p className="product_code">Код товара: {product.id}</p>
            </Row>
            <Row>
              <p className="price_product">{product.price} РУБ</p>
            </Row>
            <Row className="color_product">
              <p className="color_product_p">Цвет: </p>
              <Form.Select aria-label="Default select example">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Row>
            <Row className="size_product">
              Размер:
              <Form.Select aria-label="Default select example">
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
              <p className="size_guide">Подробнее о размере</p>
            </Row>
            <Row className="mt-3">
              <Col xs={12} md={6} className="add_btn_container">
                {isProductInBasket(product) ? (
                  <button
                    class="cart_btn"
                    onClick={() => addProductInBasket(product)}
                    disabled={!user.isAuth ? true : false}
                  >
                    <BsCartPlus /> Добавить в корзину
                  </button>
                ) : (
                  <a href={BASKET_ROUTE}>
                    <button class="cart_btn_success">
                      <BsCheckLg /> Уже в корзине
                    </button>
                  </a>
                )}
              </Col>
              <Col xs={12} md={6} className="add_btn_container">
                {isProductInLikes(product) ? (
                  <button
                    class="likes_btn"
                    onClick={() => addProductInLikes(product)}
                    disabled={!user.isAuth ? true : false}
                  >
                    <BsHeart /> Добавить в избранное
                  </button>
                ) : (
                  <button
                    class="likes_btn_success"
                    onClick={() => likes.setDeleteItemLikes(product, true)}
                    disabled={!user.isAuth ? true : false}
                  >
                    <BsHeart /> В избранном
                  </button>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
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
              {product.info.length == 0 ? (
                <p>На данный товар еще не было отзывов...</p>
              ) : (
                product.info.map((item) => (
                  <p>
                    <b>{item.title}</b> : {item.description}
                  </p>
                ))
              )}
            </Tab>
            <Tab eventKey="reviews" title="Отзывы">
              {reviews?.length == 0 ? (
                <p>На данный товар еще не было отзывов...</p>
              ) : (
                reviews?.map((rew) => {
                  return (
                    <ReviewUI
                      name_user={rew.review.user.name}
                      family_user={rew.review.user.family}
                      img_user={rew.review.user.img_user}
                      text_review={rew.text_reviews}
                      img_review={rew.img_reviews}
                      description_true={rew.description_true}
                      size_true={rew.size_true}
                      delivery_true={rew.delivery_true}
                      isVk={rew.review.user.isVK}
                      rate={rew.rate}
                      isGoogle={rew.review.user.isGoogle}
                    />
                  );
                })
              )}
            </Tab>
            <Tab
              eventKey="question"
              title={
                <>
                  Вопросы{" "}
                  {QA?.length != 0 ? (
                    <span className="badge_span">{QA?.length}</span>
                  ) : (
                    ""
                  )}
                </>
              }
            >
              <Row>
                <Col xs={12} md={12} xl={7}>
                  {QA?.length == 0 ? (
                    <p>По данному товару пока что не было вопросов...</p>
                  ) : (
                    QA?.map((question) => {
                      return (
                        <>
                          <Container fluid>
                            <Row>
                              <Card className="card_qa p-1">
                                <Card.Body>
                                  <Row className="w-100">
                                    <Col xs={12} md={12}>
                                      <Card className="card_question">
                                        <Card.Header>
                                          {question.question.user.isVk ||
                                          question.question.user.isGoogle ? (
                                            <Image
                                              src={
                                                question.question.user.img_user
                                              }
                                              width={35}
                                              style={{
                                                borderRadius: "50%",
                                                padding: 0,
                                                margin: 0,
                                              }}
                                            ></Image>
                                          ) : (
                                            <Image
                                              src={
                                                process.env.REACT_APP_API_URL +
                                                question.question.user.img_user
                                              }
                                              width={35}
                                              style={{
                                                borderRadius: "50%",
                                                padding: 0,
                                                margin: 0,
                                              }}
                                            ></Image>
                                          )}{" "}
                                          {question.question.user.name}{" "}
                                          {question.question.user.family}
                                        </Card.Header>
                                        <Card.Body className="p-1">
                                          <p className="text">
                                            {question.question.question_text}
                                          </p>
                                        </Card.Body>
                                      </Card>
                                    </Col>
                                    <Col xs={12} md={12}>
                                      <Card className="card_answer">
                                        <Card.Header>
                                        {question.answer.user.isVk ||
                                          question.answer.user.isGoogle ? (
                                            <Image
                                              src={
                                                question.answer.user.img_user
                                              }
                                              width={35}
                                              style={{
                                                borderRadius: "50%",
                                                padding: 0,
                                                margin: 0,
                                              }}
                                            ></Image>
                                          ) : (
                                            <Image
                                              src={
                                                process.env.REACT_APP_API_URL +
                                                question.answer.user.img_user
                                              }
                                              width={35}
                                              style={{
                                                borderRadius: "50%",
                                                padding: 0,
                                                margin: 0,
                                              }}
                                            ></Image>
                                          )}
                                          {" "}{question.answer.user.name}{" "}
                                          {question.answer.user.family}
                                        </Card.Header>
                                        <Card.Body className="p-1">
                                          <p className="text">
                                            {question.answer.answer_text}
                                          </p>
                                        </Card.Body>
                                      </Card>
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </Row>
                          </Container>
                        </>
                      );
                    })
                  )}
                </Col>
                <Col
                  xs={12}
                  md={12}
                  xl={5}
                  className="flex align-items-center text-center"
                >
                  <p className="title_add">Задать вопрос</p>
                  <Image
                    src={
                      process.env.PUBLIC_URL +
                      "/img/productcard/question_sticker.png"
                    }
                    width={250}
                  />
                  <p className="quest_about_text">
                    Если у вас есть вопрос по данному товару, то вы можете
                    задать его, нажав на кнопку "Задать вопрос" )
                  </p>
                  <Button
                    className="question_btn"
                    onClick={handleShowQuestionModal}
                  >
                    Задать вопрос по товару
                  </Button>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="rating" title="Рейтинг">
              <Row>
                <Col xs={7}>
                  <p className="title_add">Пользовательский рейтинг</p>
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={5}
                    size="large"
                  />
                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="success"
                    now={
                      (reviews?.filter((item) => item.rate == 5).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={4}
                    size="large"
                  />
                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="info"
                    now={
                      (reviews?.filter((item) => item.rate == 4).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={3}
                    size="large"
                  />

                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="warning"
                    now={
                      (reviews?.filter((item) => item.rate == 3).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={2}
                    size="large"
                  />

                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="danger"
                    now={
                      (reviews?.filter((item) => item.rate == 2).length /
                        reviews?.length) *
                      100
                    }
                  />
                  <Rating
                    name="size-large"
                    readOnly
                    defaultValue={1}
                    size="large"
                  />

                  <ProgressBar
                    className="mt-2"
                    striped
                    variant="secondary"
                    now={
                      (reviews?.filter((item) => item.rate == 1).length /
                        reviews?.length) *
                      100
                    }
                  />
                </Col>
                <Col xs={5}>
                  <Row className="d-flex flex-row justify-content-center">
                    <Col className="d-flex flex-row justify-content-center">
                      <Image
                        src={
                          process.env.PUBLIC_URL +
                          "/img/productcard/video-calling.png"
                        }
                        width={250}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {reviews?.length != 0 ? (
                      <p className="quest_about_text text-center">
                        Рейтинг составляет {product.rating} балл(-а) и основан
                        на {reviews?.length} отывах(-е)...
                      </p>
                    ) : (
                      <p className="quest_about_text text-center">
                        Еще не один пользователь не оценил данный товар...
                      </p>
                    )}
                  </Row>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </Row>
      </Container>

      <QuestionModal
        id_user={user.user.id}
        id_product={id}
        showQuestionModal={showQuestionModal}
        handleCloseQuestionModal={handleCloseQuestionModal}
      />
      <ErrorAuthModalQuestion
        stateModal={showErrorAuthModal}
        handleCloseModal={handleCloseErrorAuthModal}
      />
      <ErrorAddQuestionModal
        stateModal={showErrorModal}
        handleCloseModal={handleCloseErrorModal}
      />
    </>
  );
});

export default SimpleProduct;
