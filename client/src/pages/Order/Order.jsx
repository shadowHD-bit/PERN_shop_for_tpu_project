import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Dropdown,
  Image,
  ListGroup,
  Pagination,
  Row,
  Spinner,
} from "react-bootstrap";
import { Context } from "../..";
import {
  fetchOrders,
  fetchOrdersUser,
  getOneOrderProducts,
} from "../../http/orderAPI";
import OneOrder from "./OneOrder";
import "./Order.scss";

const Order = () => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(false);
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
    fetchOrdersUser({ userId: user.user.id, limit, page: 1 }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchOrdersUser({ userId: user.user.id, limit, page: currentPage }).then(
      (data) => {
        setOrders(data);
        setLoading(false);
      }
    );
  }, [currentPage]);

  useEffect(() => {
    setLoading(true);
    fetchOrdersUser({
      userId: user.user.id,
      limit,
      page: 1,
      complete: filter,
    }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
      setCurrentPage(1);
    });
  }, [filter]);

  //re-render after change status, or delete some order
  useEffect(() => {
    setLoading(true);
    fetchOrdersUser({
      userId: user.user.id,
      limit,
      page: currentPage,
      complete: filter,
    }).then((data) => {
      setOrders(data);
      setLoading(false);
      setCount(data.count);
      setCurrentPage(1);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  if (loading) {
    return <Spinner animation="grow" />;
  }

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

  if (orders.count == 0) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <Image
          src={process.env.PUBLIC_URL + "/img/basket/basketEmpty.png"}
          width="200"
        />
        <div
          className="text-center mt-5"
          style={{ fontSize: 28, marginBottom: 100 }}
        >
          <b>У вас еще не было заказов...</b>
        </div>
      </div>
    );
  } else {
    return (
      <Container className="d-flex flex-column">
        <Row>
          <Col
            xs={12}
            className="mt-3 d-flex justify-content-center align-items-center"
          >
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
                  <Dropdown.Item onClick={() => setFilter("not-completed")}>
                    Не завершенные
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="mt-3">
          {orders.rows?.map(({ id, complete, createdAt, updatedAt }) => (
            <OneOrder
              key={id}
              id={id}
              complete={complete}
              createdAt={createdAt}
              updatedAt={updatedAt}
              reRender={reRender}
            />
          ))}
        </Row>
        <Pagination
          size="sm"
          className="mt-4 mb-4"
          style={{ margin: "0 auto" }}
        >
          {pages}
        </Pagination>
      </Container>
    );
  }
};

export default Order;
