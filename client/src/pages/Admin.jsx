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
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "..";
import CreateBrand from "../components/modals/CreateBrand";
import CreateProduct from "../components/modals/CreateProduct";
import CreateSlider from "../components/modals/CreateSlides";
import CreateType from "../components/modals/CreateType";
import ChangeProduct from "../components/modals/ChangeProduct";
import DeleteTypeBrand from "../components/modals/DeleteTypeBrand";
import { fetchDeleteProduct, fetchProduct } from "../http/productAPI";
import { ADMIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import ChangeSlides from "../components/modals/ChangeSlide";
import { fetchOrders } from "../http/orderAPI";
import OrderItemAdmin from "../components/OrderItemAdmin";

const Admin = observer(() => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [slideCreateVisible, setSlideCreateVisible] = useState(false);
  const [slideChangeVisible, setSlideChangeVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [typeBrandDeleteVisible, setDeleteTypeBrandVisible] = useState(false);
  const [changeVisible, setChangeVisible] = useState(false);
  const [changeProductData, setChangeProductData] = useState();
  const [stateAccordion, setStateAccordion] = useState(false);
  const [temp, setTemp] = useState(false);
  const { product } = useContext(Context);

  React.useEffect(() => {
    fetchProduct(null, null, 1, 10).then((data) => {
      product.setProduct(data.rows);
      product.setTotalCount(data.count);
    });
  }, [setSlideChangeVisible]);

  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const showSuccessMsgFunc = (msg) => {
    setSuccessMsg(msg);
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 5000);
  };

  const history = useNavigate();

  const deleteProduct = (id) => {
    fetchDeleteProduct(id).then(() => {
      history(ADMIN_ROUTE);
    });
  };

  const changeProduct = (product) => {
    setChangeProductData(product);
    setChangeVisible(true);
  };

  const UpdatePageDataProducts = () => {
    fetchProduct(null, null, 1, 10).then((data) => {
      product.setProduct(data.rows);
      product.setTotalCount(data.count);
    });
  };

  const [searchValue, setSearchValue] = useState("");
  const [searchValueOrder, setSearchValueOrder] = useState("");

  const filteredProduct = product.products.filter((prod) => {
    return prod.name.toLowerCase().includes(searchValue.toLowerCase());
  });



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


  return (
    <Container className="d-flex flex-column">
      <h1>?????????????? (v. 1.0.1)</h1>

      <Card className="mt-3">
        <Card.Title className="text-center">
          <h2 className="mt-2 ml-2">???????????? ?? ???????????? ?? ????????????????</h2>
        </Card.Title>
        <Card.Body>
          <div className="d-flex flex-row justify-content-around">
            <Button
              variant={"outline-dark"}
              className="mt-4 mr-2 w-50"
              onClick={() => setTypeVisible(true)}
            >
              ???????????????? ??????
            </Button>
            <Button
              variant={"outline-dark"}
              className="mt-4 ml-2 w-50"
              onClick={() => setBrandVisible(true)}
            >
              ???????????????? ??????????
            </Button>
          </div>
          <Button
            variant={"outline-dark"}
            className="mt-4 p-2 w-100"
            onClick={() => setDeleteTypeBrandVisible(true)}
          >
            ?????????????? ??????/??????????
          </Button>
        </Card.Body>
      </Card>

      <Card className="mt-3">
        <Card.Title className="text-center">
          <h2 className="mt-2 ml-2">???????????? ???? ??????????????????</h2>
        </Card.Title>
        <Card.Body>
          <div className="d-flex flex-row justify-content-around">
            <Button
              variant={"outline-dark"}
              className="mt-4 mr-2 w-50"
              onClick={() => setSlideCreateVisible(true)}
            >
              ???????????????? ??????????
            </Button>

            <Button
              variant={"outline-dark"}
              className="mt-4 ml-2 w-50"
              onClick={() => setSlideChangeVisible(true)}
            >
              ??????????????/???????????????? ??????????
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card className="mt-3 mb-3">
        <Card.Title className="text-center">
          <h2 className="mt-2 ml-2">???????????? ?? ??????????????</h2>
        </Card.Title>
        <Card.Body>
          <Button
            variant={"outline-dark"}
            className="mt-4 p-2 w-100"
            onClick={() => setProductVisible(true)}
          >
            ???????????????? ??????????
          </Button>
          <Accordion>
            <Accordion.Item
              eventKey=""
              className="mt-4 mb-4"
              onClick={() => setStateAccordion(true)}
            >
              <AccordionHeader>???????????? ??????????????</AccordionHeader>
              <AccordionBody>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="?????????? ???????????? ???? ????????????????"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearchValue(e.target.value)}
                    // value={searchDevice}
                    // onChange={e => setSearchDevice(e.target.value)}
                  />
                  <Container className="d-flex flex-row">
                    <Button
                      variant="outline-success"
                      className="ml-1"
                      onClick={() => UpdatePageDataProducts()}
                    >
                      ???????????????? ????????????
                    </Button>
                  </Container>
                </Form>
                <Table striped bordered hover className="mt-4 p-2">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>????????????????</th>
                      <th>????????</th>
                      <th>??????????????</th>
                      <th>???????????????? ??????????????????????</th>
                      <th>???????? ????????????????????</th>
                      <th>??????????</th>
                      <th>??????</th>
                      <th>??????????????</th>
                      <th>????????????????</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProduct.slice().map((productItem) => (
                      <tr key={productItem.id}>
                        <td key={productItem.id}>{productItem.id}</td>
                        <td key={productItem.name}>{productItem.name}</td>
                        <td key={productItem.price}>{productItem.price}</td>
                        <td key={productItem.rating + Math.random()}>
                          {productItem.rating}
                        </td>
                        <td key={productItem.imgMain}>{productItem.imgMain}</td>
                        <td key={productItem.createdAt}>
                          {productItem.createdAt}
                        </td>
                        <td key={productItem.productBrandId + Math.random()}>
                          {productItem.productBrandId}
                        </td>
                        <td key={productItem.productTypeId + Math.random()}>
                          {productItem.productTypeId}
                        </td>
                        <td key={Math.random() + Math.random()}>
                          <Button
                            variant={"outline-danger"}
                            onClick={() => deleteProduct(productItem.id)}
                          >
                            ??????????????
                          </Button>
                        </td>
                        <td key={Math.random() + Math.random()}>
                          <Button
                            variant={"outline-primary"}
                            onClick={() => changeProduct(productItem)}
                          >
                            ????????????????
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </AccordionBody>
            </Accordion.Item>
          </Accordion>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Title className="text-center">
          <h2 className="mt-2 ml-2">???????????? ?? ????????????????</h2>
        </Card.Title>
        <Card.Body>
          <Accordion>
            <Accordion.Item
              eventKey=""
              className="mt-4 mb-4"
              onClick={() => setStateAccordion(true)}
            >
              <Accordion.Header>???????????? ??????????????</Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col
                    xs={12}
                    className="mt-3 d-flex justify-content-center align-items-center"
                  >
                    <FormControl
                    type="search"
                    placeholder="?????????? ???????????? ???? id"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => setSearchValueOrder(e.target.value)}
                    // value={searchDevice}
                    // onChange={e => setSearchDevice(e.target.value)}
                  />
                    <div className="mr-3">????????????:</div>
                    <Dropdown>
                      <Dropdown.Toggle variant="success">
                        {filter == "all"
                          ? "??????"
                          : filter == "completed"
                          ? "??????????????????????"
                          : "???? ??????????????????????"}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {filter === "all" ? (
                          <Dropdown.Item disabled>??????</Dropdown.Item>
                        ) : (
                          <Dropdown.Item onClick={() => setFilter("all")}>
                            ??????
                          </Dropdown.Item>
                        )}
                        {filter === "completed" ? (
                          <Dropdown.Item disabled>??????????????????????</Dropdown.Item>
                        ) : (
                          <Dropdown.Item onClick={() => setFilter("completed")}>
                            ??????????????????????
                          </Dropdown.Item>
                        )}
                        {filter === "not-completed" ? (
                          <Dropdown.Item disabled>???? ??????????????????????</Dropdown.Item>
                        ) : (
                          <Dropdown.Item
                            onClick={() => setFilter("not-completed")}
                          >
                            ???? ??????????????????????
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
                <Table striped bordered hover className="mt-4 p-2">
                  <thead>
                    <tr>
                      <th>ID ????????????</th>
                      <th>ID ????????????????????????</th>
                      <th>???????????????????? ?? ????????????</th>
                      <th>???????? ???????????????? ????????????</th>
                      <th>???????? ???????????????????? ????????????</th>
                      <th>???????????????? ????????????</th>
                      <th>??????????????</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.rows?.filter((ord) => {
                      return ord.id.toString().toLowerCase().includes(searchValueOrder.toLowerCase());
                    }).slice().map(
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
        </Card.Body>
      </Card>

      <ChangeProduct
        show={changeVisible}
        onHide={() => setChangeVisible(false)}
        productChange={changeProductData}
        updatePage={() => setTemp(!temp)}
      />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateProduct
        show={productVisible}
        onHide={() => setProductVisible(false)}
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
      
    </Container>
  );
});

export default Admin;
