import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Accordion,
  Alert,
  Button,
  Col,
  Container,
  Dropdown,
  FormControl,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { AiOutlineMenuFold } from "react-icons/ai";
import OrderItemAdmin from "../../../../components/AdminItems/OrderItemAdmin";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import { fetchOrders } from "../../../../http/orderAPI";

const AdminOrder = () => {
  const [showAlert, setShowAlert] = useState(true);

  const [showSidebar, setShowSidebar] = useState(false);
  const [stateAccordion, setStateAccordion] = useState(false);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("All");
  const [rerender, setRerender] = useState(false);

  //pagination
  const limit = 5;
  const pageCount = Math.ceil(Number(count) / limit);
  const pages = [];
  const [searchValueOrder, setSearchValueOrder] = useState("");

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

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="outline-warning"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            Админ-панель (v.1.2)
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>Раздел "Заказы"</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="warning"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с заказами...
                </Alert.Heading>
                <p>Здесь ты можешь работать с заказами:</p>
                <ul>
                  <li>
                    Чтобы изнать информацию о заказе, выбирете соответствующую
                    позицию в таблице и нажмите кнопку "Информация".
                  </li>
                  <li>
                    Чтобы удалить заказ, выбери позицию в соответствующей
                    таблице и нажмите кнопку "Удалить", подтвердив действие.
                  </li>
                  <li>
                    Чтобы изменить статус заказа, выберите соответствующую
                    позицию в таблице и нажмите на кнопку статуа. Статус
                    автоматически измениться на противоположный.
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
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
                            <Dropdown.Item
                              onClick={() => setFilter("completed")}
                            >
                              Завершенные
                            </Dropdown.Item>
                          )}
                          {filter === "not-completed" ? (
                            <Dropdown.Item disabled>
                              Не завершенные
                            </Dropdown.Item>
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
                        .map(
                          ({ id, complete, createdAt, updatedAt, userId }) => (
                            <OrderItemAdmin
                              key={id}
                              id={id}
                              complete={complete}
                              createdAt={createdAt}
                              updatedAt={updatedAt}
                              userId={userId}
                              reRender={reRender}
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
                    {pages}
                  </Pagination>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />
    </>
  );
};
export default AdminOrder;
