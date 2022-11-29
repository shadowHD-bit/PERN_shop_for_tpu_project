import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Link } from "react-router-dom";
import SideBar from "../../components/UI/AdminSideBar/SideBar";
import {
  fetchBadge,
  fetchBrands,
  fetchProduct,
  fetchSizes,
  fetchTypes,
} from "../../http/productAPI";
import { fetchQuestion } from "../../http/questionAPI";
import { fetchSlider } from "../../http/sliderAPI";
import {
  getMoneyUserApi,
  getNewUserApi,
  getUserRoleAdminApi,
} from "../../http/userAPI";
import {
  ADMIN_BADGE_ROUTE,
  ADMIN_BRANDANDTYPE_ROUTE,
  ADMIN_PRODUCT_ROUTE,
  ADMIN_QUESTION_ROUTE,
  ADMIN_SIZE_ROUTE,
  ADMIN_SLIDER_ROUTE,
} from "../../utils/consts";
import "./Admin.scss";

const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const [countProduct, setCountProduct] = useState(0);
  const [countType, setCountType] = useState(0);
  const [countBrand, setCountBrand] = useState(0);
  const [countQuestion, setCountQuestion] = useState(0);

  const [countSize, setCountSize] = useState(0);
  const [countBadge, setCountBadge] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const [countSlide, setCountSlide] = useState(0);
  const [adminUser, setAdminUser] = useState([]);
  const [adminUserCount, setAdminUserCount] = useState(0);
  const [newUser, setNewUser] = useState([]);
  const [moneyUser, setMoneyUser] = useState([]);

  useEffect(() => {
    fetchProduct().then((data) => {
      setCountProduct(data.count);
    });
    fetchTypes().then((data) => {
      setCountType(data.count);
    });
    fetchBrands().then((data) => {
      setCountBrand(data.count);
    });
    fetchQuestion({ limit: 1000, page: 1000 }).then((data) => {
      setCountQuestion(data.count);
    });
    fetchSizes().then((data) => {
      setCountSize(data.count);
    });
    fetchBadge().then((data) => {
      setCountBadge(data.count);
    });
    // fetchBrands().then(data => {
    //   setCountBrand(data.count)
    // })
    fetchSlider().then((data) => {
      setCountSlide(data.length);
    });
    getUserRoleAdminApi().then((data) => {
      setAdminUser(data.rows);
      setAdminUserCount(data.count);
    });
    getNewUserApi().then((data) => {
      setNewUser(data);
    });
    getMoneyUserApi().then((data) => {
      setMoneyUser(data);
    });
  }, []);

  const [resultMoneyUser, setResultMoneyUser] = useState([]);

  useEffect(() => {
    let resultArray = [];
    moneyUser.map((item) => {
      // if (resultArray.find((obj) => obj.user_id == item.user.id)) {
      if (resultArray.find((obj) => obj.user_id == item.user.id) != undefined) {
        resultArray.map((res) => {
          item.order_products.map((res_o) => {
            if (res.user_id == item.user.id) {
              return (res.totalPrice = res.totalPrice + res_o.totalPrice);
            } else {
              return res;
            }
          });
        });
      } else {
        let total;
        if (item.order_products.length == 1) {
          total = item.order_products[0].totalPrice;
        } else {
          item.order_products.reduce((a, c) => a + c, total);
        }
        resultArray.push({
          user_id: item.user.id,
          user_name: item.user.name,
          user_family: item.user.family,
          user_img: item.user.img_user,
          isVK:  item.user.isVK,
          isGoogle:  item.user.isGoogle,
          totalPrice: total,
        });
      }
    });
    setResultMoneyUser(resultArray);
  }, [moneyUser]);

  console.log(resultMoneyUser, moneyUser);

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="outline-primary"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            Админ-панель (v.1.2)
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>Раздел "Главная"</Col>
        </Row>
        <Row>
          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_PRODUCT_ROUTE}>
              <Alert variant="success">
                <Alert.Heading>{countProduct}</Alert.Heading>
                Количество товаров
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_BRANDANDTYPE_ROUTE}>
              <Alert variant="danger">
                <Alert.Heading>{countType}</Alert.Heading>
                Количество типов
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_BRANDANDTYPE_ROUTE}>
              <Alert variant="warning">
                <Alert.Heading>{countBrand}</Alert.Heading>
                Количество брендов
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_QUESTION_ROUTE}>
              <Alert variant="info">
                <Alert.Heading>{countQuestion}</Alert.Heading>
                Количество вопросов
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_SIZE_ROUTE}>
              <Alert variant="secondary">
                <Alert.Heading>{countSize}</Alert.Heading>
                Количество размеров
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_BADGE_ROUTE}>
              <Alert variant="success">
                <Alert.Heading>{countBadge}</Alert.Heading>
                Количество бэйджов
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_PRODUCT_ROUTE}>
              <Alert variant="danger">
                <Alert.Heading>{countUser}</Alert.Heading>
                Количество пользователей
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_PRODUCT_ROUTE}>
              <Alert variant="success">
                <Alert.Heading>{adminUserCount}</Alert.Heading>
                Количество администраторов
              </Alert>
            </Link>
          </Col>

          <Col xs={12} md={6} xl={3}>
            <Link to={ADMIN_SLIDER_ROUTE}>
              <Alert variant="warning">
                <Alert.Heading>{countSlide}</Alert.Heading>
                Количество слайдов
              </Alert>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} xl={4}>
            <ListGroup as="ol" numbered>
              <ListGroup.Item variant="danger">
                Список администраторов
              </ListGroup.Item>
              {adminUser?.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="d-flex flex-row justify-content-center align-items-center">
                    <Col>
                      {item.isVK || item.isGoogle ? (
                        <Image
                          src={item.img_user}
                          width={35}
                          style={{
                            borderRadius: "50%",
                            padding: 0,
                            margin: 0,
                          }}
                        ></Image>
                      ) : (
                        <Image
                          src={process.env.REACT_APP_API_URL + item.img_user}
                          width={35}
                          style={{
                            borderRadius: "50%",
                            padding: 0,
                            margin: 0,
                          }}
                        ></Image>
                      )}{" "}
                      {item.name} {item.family}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col xs={12} md={6} xl={4}>
            <ListGroup as="ol" numbered>
              <ListGroup.Item variant="danger">
                Список новых пользователей
              </ListGroup.Item>
              {newUser?.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="d-flex flex-row justify-content-center align-items-center">
                    <Col>
                      {item.isVK || item.isGoogle ? (
                        <Image
                          src={item.img_user}
                          width={35}
                          style={{
                            borderRadius: "50%",
                            padding: 0,
                            margin: 0,
                          }}
                        ></Image>
                      ) : (
                        <Image
                          src={process.env.REACT_APP_API_URL + item.img_user}
                          width={35}
                          style={{
                            borderRadius: "50%",
                            padding: 0,
                            margin: 0,
                          }}
                        ></Image>
                      )}{" "}
                      {item.name} {item.family}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col xs={12} md={6} xl={4}>
            <ListGroup as="ol" numbered>
              <ListGroup.Item variant="danger">
                Список пользователей по покупкам
              </ListGroup.Item>
              {resultMoneyUser?.sort((a,b) => {return b.totalPrice-a.totalPrice}).slice(0,5).map((item) => (
                <ListGroup.Item key={item.user_id}>
                  <Row className="d-flex flex-row justify-content-center align-items-center">
                    <Col>
                      {item.isVK ||
                      item.isGoogle ? (
                        <Image
                          src={item.user_img}
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
                            item.user_img
                          }
                          width={35}
                          style={{
                            borderRadius: "50%",
                            padding: 0,
                            margin: 0,
                          }}
                        ></Image>
                      )}{" "}
                      {item.user_name} {item.user_family}
                    </Col>
                    <Col xs={4} className="d-flex flex-row justify-content-end">
                      {item.totalPrice} РУБ
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};

export default Admin;
