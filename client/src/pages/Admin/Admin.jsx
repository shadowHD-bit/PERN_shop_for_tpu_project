import React, { useContext, useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  FormControl,
  Offcanvas,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../..";
import CreateBrand from "../../components/modals/CreateBrand";
import CreateProduct from "../../components/modals/CreateProduct";
import CreateSlider from "../../components/modals/CreateSlides";
import CreateType from "../../components/modals/CreateType";
import ChangeProduct from "../../components/modals/ChangeProduct";
import DeleteTypeBrand from "../../components/modals/DeleteTypeBrand";
import {
  fetchDeleteProduct,
  fetchProduct,
  fetchProductsForAdmin,
} from "../../http/productAPI";
import {
  ADMIN_BRANDANDTYPE_ROUTE,
  ADMIN_EXCEL_ROUTE,
  ADMIN_ROUTE,
} from "../../utils/consts";
import { observer } from "mobx-react-lite";
import ChangeSlides from "../../components/modals/ChangeSlide";
import { fetchOrders } from "../../http/orderAPI";
import OrderItemAdmin from "../../components/OrderItemAdmin";
import { fetchQuestion } from "../../http/questionAPI";
import QuestionItemAdmin from "../../components/QuestionItemAdmin";
import "./Admin.scss";
import {
  AiOutlineMenu,
  AiOutlineMenuFold,
  AiOutlineUser,
} from "react-icons/ai";
import ProductItemAdmin from "../../components/productItemAdmin";

const Admin = observer(() => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [slideCreateVisible, setSlideCreateVisible] = useState(false);
  const [slideChangeVisible, setSlideChangeVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [typeBrandDeleteVisible, setDeleteTypeBrandVisible] = useState(false);
  const [stateAccordion, setStateAccordion] = useState(false);

  const [show, setShow] = useState(false);

  const [productData, setProductData] = useState([]);

  const [currentPageProduct, setCurrentPageProduct] = useState(1);
  const [countProduct, setCountProduct] = useState(0);
  //pagination
  const limitProduct = 5;
  const pageCountProduct = Math.ceil(Number(countProduct) / limitProduct);
  const pagesProduct = [];

  console.log(productData);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  React.useEffect(() => {
    fetchProductsForAdmin({ page: 1, limit:limitProduct }).then((data) => {
      setProductData(data.rows);
      setCountProduct(data.count);
    });
  }, [setSlideChangeVisible]);

  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const showSuccessMsgFunc = (msg) => {
    setSuccessMsg(msg);
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 5000);
  };

  const [searchValue, setSearchValue] = useState("");
  const [searchValueOrder, setSearchValueOrder] = useState("");

  useEffect(() => {
    fetchProductsForAdmin({ page: 1, limit:10 }).then((data) => {
      setProductData(data.rows);
      setCountProduct(data.count);
    });
  }, []);

  useEffect(() => {
    fetchProductsForAdmin({ page: 1, limit:limitProduct }).then((data) => {
      setProductData(data.rows);
      setCountProduct(data.count);
    });
  }, []);

  useEffect(() => {
    fetchProductsForAdmin({ page: currentPageProduct, limit:limitProduct }).then((data) => {
      setProductData(data.rows);
    });
  }, [currentPageProduct]);

  const filteredProduct = productData.filter((prod) => {
    if(searchValue){
      return prod.name.toLowerCase().includes(searchValue.toLowerCase())
    } 
    return prod.name;
  });

  const [rerenderProduct, setRerenderProduct] = useState(false);

  useEffect(() => {
    fetchProductsForAdmin({ page: 1, limit:limitProduct}).then((data) => {
      setProductData(data.rows);
      setCountProduct(data.count);
    });
  }, [rerenderProduct]);

  const reRenderProduct = () => {
    setRerenderProduct(!rerenderProduct);
  };

  //Product pagination
  for (
    let numberProduct = 1;
    numberProduct < pageCountProduct + 1;
    numberProduct++
  ) {
    pagesProduct.push(
      <Pagination.Item
        key={numberProduct}
        active={numberProduct === currentPageProduct}
        onClick={() => setCurrentPageProduct(numberProduct)}
      >
        {numberProduct}
      </Pagination.Item>
    );
  }

  //Orders Logic

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("All");
  const [rerender, setRerender] = useState(false);

  //pagination
  const limit = 5;
  const pageCount = Math.ceil(Number(count) / limit);
  const pages = [];

  useEffect(() => {
    fetchOrders({ limit, page: 1 }).then((data) => {
      setOrders(data);
      setCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchOrders({ limit, page: 1 }).then((data) => {
      setOrders(data);
      setCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchOrders({ limit, page: currentPage }).then((data) => {
      setOrders(data);
    });
  }, [currentPage]);

  useEffect(() => {
    fetchOrders({ limit, page: 1, complete: filter }).then((data) => {
      setOrders(data);
      setCount(data.count);
      setCurrentPage(1);
    });
  }, [filter]);

  //re-render after change status, or delete some order
  useEffect(() => {
    fetchOrders({ limit, page: currentPage, complete: filter }).then((data) => {
      setOrders(data);
      setCount(data.count);
      setCurrentPage(1);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  //Orders pagination
  for (let number = 1; number < pageCount + 1; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  /////////////
  //Question Logic

  const [questions, setQuestions] = useState([]);
  const [currentPageQuestion, setCurrentPageQuestion] = useState(1);
  const [countQuestion, setCountQuestion] = useState(0);
  const [filterQuestion, setFilterQuestion] = useState("all");
  const [rerenderQuestions, setRerenderQuestion] = useState(false);

  //Question pagination
  const limitQuestion = 5;
  const pageCountQuestion = Math.ceil(Number(countQuestion) / limitQuestion);
  const pagesQuestion = [];

  useEffect(() => {
    fetchQuestion({ limit: limitQuestion, page: 1 }).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
    });
  }, []);

  useEffect(() => {
    fetchQuestion({ limit: limitQuestion, page: 1 }).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
    });
  }, []);

  useEffect(() => {
    fetchQuestion({ limit: limitQuestion, page: currentPageQuestion }).then(
      (data) => {
        setQuestions(data);
      }
    );
  }, [currentPageQuestion]);

  useEffect(() => {
    fetchQuestion({
      limit: limitQuestion,
      page: 1,
      complete: filterQuestion,
    }).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
      setCurrentPageQuestion(1);
      console.log(data);
    });
  }, [filterQuestion]);

  //re-render after change status, or delete some order
  useEffect(() => {
    fetchQuestion({
      limit: limitQuestion,
      page: currentPageQuestion,
      complete: filterQuestion,
    }).then((data) => {
      setQuestions(data);
      setCountQuestion(data.count);
      setCurrentPageQuestion(1);
    });
  }, [rerenderQuestions]);

  const reRenderQuestion = () => {
    setRerenderQuestion(!rerenderQuestions);
  };

  //Question pagination
  for (
    let numberQuestion = 1;
    numberQuestion < pageCountQuestion + 1;
    numberQuestion++
  ) {
    pagesQuestion.push(
      <Pagination.Item
        key={numberQuestion}
        active={numberQuestion === currentPageQuestion}
        onClick={() => setCurrentPageQuestion(numberQuestion)}
      >
        {numberQuestion}
      </Pagination.Item>
    );
  }

  return (
    <Container className="d-flex flex-column">
      <div className="d-flex">
        <Button variant="outline" onClick={toggleShow} className="me-2">
          <AiOutlineMenuFold />
        </Button>
        <h1>Админка (v. 1.0.1)</h1>
      </div>
      <Card className="mt-3">
        <Card.Title className="text-center">
          <h2 className="mt-2 ml-2">Работа с типами и брендами</h2>
        </Card.Title>
        <Card.Body>
          <div className="d-flex flex-row justify-content-around">
            <Button
              variant={"outline-dark"}
              className="mt-4 mr-2 w-50"
              onClick={() => setTypeVisible(true)}
            >
              Добавить тип
            </Button>
            <Button
              variant={"outline-dark"}
              className="mt-4 ml-2 w-50"
              onClick={() => setBrandVisible(true)}
            >
              Добавить бренд
            </Button>
          </div>
          <Button
            variant={"outline-dark"}
            className="mt-4 p-2 w-100"
            onClick={() => setDeleteTypeBrandVisible(true)}
          >
            Удалить тип/бренд
          </Button>
        </Card.Body>
      </Card>

      <Card className="mt-3">
        <Card.Title className="text-center">
          <h2 className="mt-2 ml-2">Работа со слайдером</h2>
        </Card.Title>
        <Card.Body>
          <div className="d-flex flex-row justify-content-around">
            <Button
              variant={"outline-dark"}
              className="mt-4 mr-2 w-50"
              onClick={() => setSlideCreateVisible(true)}
            >
              Добавить слайд
            </Button>

            <Button
              variant={"outline-dark"}
              className="mt-4 ml-2 w-50"
              onClick={() => setSlideChangeVisible(true)}
            >
              Удалить/Изменить слайд
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card className="mt-3 mb-3">
        <Card.Title className="text-center">
          <h2 className="mt-2 ml-2">Работа с товаром</h2>
        </Card.Title>
        <Card.Body>
          <Button
            variant={"outline-dark"}
            className="mt-4 p-2 w-100"
            onClick={() => setProductVisible(true)}
          >
            Добавить товар
          </Button>
          <Accordion>
            <Accordion.Item
              eventKey=""
              className="mt-4 mb-4"
              onClick={() => setStateAccordion(true)}
            >
              <AccordionHeader>Список товаров</AccordionHeader>
              <AccordionBody>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Поиск товара по названию"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    // value={searchDevice}
                    // onChange={e => setSearchDevice(e.target.value)}
                  />
                </Form>
                <Table striped bordered hover className="mt-4 p-2">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Название</th>
                      <th>Цена</th>
                      <th>Рейтинг</th>
                      <th>Основное изображение</th>
                      <th>Дата добавления</th>
                      <th>Бренд</th>
                      <th>Тип</th>
                      <th>Удалить</th>
                      <th>Изменить</th>
                      <th>От-ние</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProduct.slice().map((productItem) => (
                      <ProductItemAdmin
                        productItem={productItem}
                        reRenderProduct={reRenderProduct}
                      />
                    ))}
                  </tbody>
                </Table>
                <Pagination
                  size="sm"
                  className="mt-4 mb-4"
                  style={{ margin: "0 auto" }}
                >
                  {pagesProduct}
                </Pagination>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Title className="text-center">
          <h2 className="mt-2 ml-2">Работа с заказами</h2>
        </Card.Title>
        <Card.Body>
          <Accordion>
            <Accordion.Item
              eventKey=""
              className="mt-4 mb-4"
              onClick={() => setStateAccordion(true)}
            >
              <Accordion.Header>Список заказов</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col
                    xs={12}
                    className="mt-3 d-flex justify-content-center align-items-center"
                  >
                    <FormControl
                      type="search"
                      placeholder="Поиск заказа по id"
                      className="me-2"
                      aria-label="Search"
                      onChange={(e) => setSearchValueOrder(e.target.value)}
                      // value={searchDevice}
                      // onChange={e => setSearchDevice(e.target.value)}
                    />
                    <div className="mr-3">Фильтр:</div>
                    <Dropdown>
                      <Dropdown.Toggle variant="success">
                        {filter == "all"
                          ? "Все"
                          : filter == "completed"
                          ? "Завершенные"
                          : "Не завершенные"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {filter === "all" ? (
                          <Dropdown.Item disabled>Все</Dropdown.Item>
                        ) : (
                          <Dropdown.Item onClick={() => setFilter("all")}>
                            Все
                          </Dropdown.Item>
                        )}
                        {filter === "completed" ? (
                          <Dropdown.Item disabled>Завершенные</Dropdown.Item>
                        ) : (
                          <Dropdown.Item onClick={() => setFilter("completed")}>
                            Завершенные
                          </Dropdown.Item>
                        )}
                        {filter === "not-completed" ? (
                          <Dropdown.Item disabled>Не завершенные</Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => setFilter("not-completed")}
                          >
                            Не завершенные
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <Table striped bordered hover className="mt-4 p-2">
                  <thead>
                    <tr>
                      <th>ID заказа</th>
                      <th>ID пользователя</th>
                      <th>Информация о заказе</th>
                      <th>Дата создания заказа</th>
                      <th>Дата завершения заказа</th>
                      <th>Изменить статус</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.rows
                      ?.filter((ord) => {
                        return ord.id
                          .toString()
                          .toLowerCase()
                          .includes(searchValueOrder.toLowerCase());
                      })
                      .slice()
                      .map(({ id, complete, createdAt, updatedAt, userId }) => (
                        <OrderItemAdmin
                          key={id}
                          id={id}
                          complete={complete}
                          createdAt={createdAt}
                          updatedAt={updatedAt}
                          userId={userId}
                          reRender={reRender}
                        />
                      ))}
                  </tbody>
                </Table>
                <Pagination
                  size="sm"
                  className="mt-4 mb-4"
                  style={{ margin: "0 auto" }}
                >
                  {pages}
                </Pagination>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Title className="text-center">
          <h2 className="mt-2 ml-2">Работа с вопросами</h2>
        </Card.Title>
        <Card.Body>
          <Accordion>
            <Accordion.Item
              eventKey=""
              className="mt-4 mb-4"
              onClick={() => setStateAccordion(true)}
            >
              <Accordion.Header>Список вопросов</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col
                    xs={12}
                    className="mt-3 d-flex justify-content-center align-items-center"
                  >
                    <div className="mr-3">Фильтр:</div>
                    <Dropdown>
                      <Dropdown.Toggle variant="success">
                        {filterQuestion == "all"
                          ? "Все"
                          : filterQuestion == "completed"
                          ? "Закрытые"
                          : "Не закрытые"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {filterQuestion === "all" ? (
                          <Dropdown.Item disabled>Все</Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => setFilterQuestion("all")}
                          >
                            Все
                          </Dropdown.Item>
                        )}
                        {filterQuestion === "completed" ? (
                          <Dropdown.Item disabled>Закрытые</Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => setFilterQuestion("completed")}
                          >
                            Закрытые
                          </Dropdown.Item>
                        )}
                        {filterQuestion === "not-completed" ? (
                          <Dropdown.Item disabled>Не Закрытые</Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => setFilterQuestion("not-completed")}
                          >
                            Не Закрытые
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <Table striped bordered hover className="mt-4 p-2">
                  <thead>
                    <tr>
                      <th>ID вопроса</th>
                      <th>ID товара</th>
                      <th>ID пользователя</th>
                      <th>Название товара</th>
                      <th>Дата создания вопроса</th>
                      <th>Статус</th>
                      <th>Дата изменения</th>
                      <th>Подробнее</th>
                      <th>Завершить</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.rows?.map(
                      ({
                        id_question,
                        userId,
                        productId,
                        createdAt,
                        updatedAt,
                        complete_question,
                        question_text,
                        product,
                        answer_to_question,
                      }) => (
                        <QuestionItemAdmin
                          key={id_question}
                          id_question={id_question}
                          userId={userId}
                          productId={productId}
                          question_text={question_text}
                          product_name={productId}
                          completeQuestion={complete_question}
                          updatedAt={updatedAt}
                          createdAt={createdAt}
                          product={product}
                          answer={answer_to_question}
                          reRenderQuestion={reRenderQuestion}
                        />
                      )
                    )}
                  </tbody>
                </Table>
                <Pagination
                  size="sm"
                  className="mt-4 mb-4"
                  style={{ margin: "0 auto" }}
                >
                  {pagesQuestion}
                </Pagination>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>

      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateProduct
        show={productVisible}
        onHide={() => setProductVisible(false)}
        reRenderProduct={reRenderProduct}
      />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      <DeleteTypeBrand
        show={typeBrandDeleteVisible}
        onHide={() => setDeleteTypeBrandVisible(false)}
        showSuccessMsgFunc={showSuccessMsgFunc}
      />
      <CreateSlider
        show={slideCreateVisible}
        onHide={() => setSlideCreateVisible(false)}
        showSuccessMsgFunc={showSuccessMsgFunc}
      />
      <ChangeSlides
        show={slideChangeVisible}
        onHide={() => setSlideChangeVisible(false)}
        showSuccessMsgFunc={showSuccessMsgFunc}
      />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Навигация</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column">
            <Button>
              <AiOutlineUser></AiOutlineUser>
              Пользователи
            </Button>
            <Button href={ADMIN_BRANDANDTYPE_ROUTE}>
              <AiOutlineUser></AiOutlineUser>
              Бренды и типы
            </Button>
            <Button>
              <AiOutlineUser></AiOutlineUser>
              Заказы
            </Button>
            <Button>
              <AiOutlineUser></AiOutlineUser>
              Товары
            </Button>
            <Button>
              <AiOutlineUser></AiOutlineUser>
              Слайдер
            </Button>
            <Button>
              <AiOutlineUser></AiOutlineUser>
              Вопросы
            </Button>
            <Button href={ADMIN_EXCEL_ROUTE}>
              <AiOutlineUser></AiOutlineUser>
              Excel
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
});

export default Admin;
