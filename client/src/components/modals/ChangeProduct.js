import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Image, Row, Col } from "react-bootstrap";
import {
  deleteInfo,
  fetchBrands,
  fetchTypes,
  getInfoOneProduct,
  updateProduct,
} from "../../http/productAPI";
import UpdatePageDataProducts from "../../pages/Admin/Admin";
import { BsPen, BsPlus, BsTrash } from "react-icons/bs";

const ChangeProduct = ({
  show,
  onHide,
  productChange,
  updatePage,
  reRenderProduct,
}) => {
  const thisProduct = { ...productChange };
  const id = thisProduct.id;
  const name = thisProduct.name;
  const price = thisProduct.price;
  const rating = thisProduct.rating;
  const imgMain = thisProduct.imgMain;
  const imgFirst = thisProduct.imgFirst;
  const imgSecond = thisProduct.imgSecond;
  const imgThird = thisProduct.imgThird;
  const info = thisProduct.info;
  const BrandId = thisProduct.productBrandId;
  const TypeId = thisProduct.productTypeId;

  const [valueName, setValueName] = useState(name || "");
  const [valuePrice, setValuePrice] = useState(price || "");
  const [valueRating, setValueRating] = useState(rating || "");
  const [valueImgMain, setValueImgMain] = useState(imgMain || "");

  const [file, setFile] = useState(null);
  const [fileOne, setFileOne] = useState(null);
  const [fileTwo, setFileTwo] = useState(null);
  const [fileThree, setFileThree] = useState(null);

  const [valueBrand, setValueBrand] = useState(BrandId || "");
  const [valueType, setValueType] = useState(TypeId || "");

  const [productAllBrands, setProductAllBrands] = useState([]);
  const [productAllTypes, setProductAllTypes] = useState([]);
  const [infoChange, setInfoChange] = useState(info || []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const selectFileOne = (e) => {
    setFileOne(e.target.files[0]);
  };
  const selectFileTwo = (e) => {
    setFileTwo(e.target.files[0]);
  };
  const selectFileThree = (e) => {
    setFileThree(e.target.files[0]);
  };

  React.useEffect(() => {
    setValueName(name);
    setValuePrice(price);
    setValueRating(rating);
    setValueImgMain(imgMain);
    setValueBrand(BrandId);
    setValueType(TypeId);
    setInfoChange(info);
  }, [name, price, rating, imgMain, BrandId, TypeId]);

  // useState(() => {
  //   setInfoChange(infoChange)
  // }, [infoChange])

  useEffect(() => {
    fetchBrands().then((data) => setProductAllBrands(data.rows));
  }, []);
  useEffect(() => {
    fetchTypes().then((data) => setProductAllTypes(data.rows));
  }, []);

  const deleteInfoWithoutArrayInfo = (ind) => {
    if (ind.id == 9999999) {
      setInfoChange(infoChange.filter((item) => item !== ind));
    } else {
      deleteInfo(ind.id).then((data) => {
        setInfoChange(infoChange.filter((item) => item !== ind));
      });
    }
  };

  const changeProduct = () => {
    const formData = new FormData();
    formData.append("name", valueName);
    formData.append("price", valuePrice);
    formData.append("imgMain", file);
    formData.append("imgFirst", fileOne);
    formData.append("imgSecond", fileTwo);
    formData.append("imgThird", fileThree);
    formData.append("productBrandId", valueBrand);
    formData.append("productTypeId", valueType);
    formData.append("info", JSON.stringify(infoChange));
    console.log(formData);
    updateProduct(id, formData).then(() => {
      setTimeout(() => reRenderProduct(), 250);
    });
    onHide();
    updatePage();
  };

  const [addedTitle, setAddedTitle] = useState("");
  const [addDescription, setAddedDescription] = useState("");

  const createInfoItem = () => {
    if (addedTitle !== "" && addDescription !== "") {
      infoChange.push({
        id: 9999999,
        title: addedTitle,
        description: addDescription,
      });
      setInfoChange(infoChange);
      setAddedTitle("");
      setAddedDescription("");
    }
  };

  return (
    <Modal show={show} onHide={onHide} size={"xl"} fullscreen={true} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Параметры товара {thisProduct.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} md={8}>
            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Название товара</Form.Label>
                  <Form.Control
                    className="mb-1"
                    value={valueName || ""}
                    onChange={(nameProduct) =>
                      setValueName(nameProduct.target.value)
                    }
                    placeholder={"Введите название типа"}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Цена товара</Form.Label>
                  <Form.Control
                    className="mb-1"
                    value={valuePrice || ""}
                    onChange={(e) => setValuePrice(e.target.value)}
                    placeholder={"Введите название типа"}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Бренд</Form.Label>
                  <Form.Select
                    aria-label="select"
                    value={valueBrand}
                    onChange={(e) => setValueBrand(e.target.value)}
                  >
                    {productAllBrands?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Тип</Form.Label>
                  <Form.Select
                    aria-label="select"
                    value={valueType}
                    onChange={(e) => setValueType(e.target.value)}
                  >
                    {productAllTypes?.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={6} className="border-right">
                <Row className="d-flex flex-row justify-content-between">
                <Form.Label>Параметры товара</Form.Label>
                  <Col xs={4}>
                    <Form.Group>
                      <Form.Control
                        placeholder="Наименование"
                        value={addedTitle}
                        onChange={(e) => setAddedTitle(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Form.Group>
                      <Form.Control
                        placeholder="Параметр"
                        value={addDescription}
                        onChange={(e) => setAddedDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Button
                      onClick={() => createInfoItem()}
                    >
                      Создать <BsPlus />
                    </Button>
                  </Col>
                </Row>
                {infoChange ? (
                  infoChange.map((item) => (
                    <Row className="mt-2">
                      <Col xs={8}>
                        <p>
                          <b>{item.title}</b> : {item.description}
                        </p>
                      </Col>
                      <Col
                        xs={4}
                        className="d-flex flex-row justify-content-end"
                      >
                        <Button
                          variant="danger"
                          onClick={() => deleteInfoWithoutArrayInfo(item)}
                        >
                          <BsTrash />
                        </Button>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <p>Нет параметров...</p>
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4} className="border-left p-3">
            <Form>
              <Form.Group controlId="formFile">
                <Row className="d-flex justify-content-center">
                  {file ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      style={{ width: "60%" }}
                    ></Image>
                  ) : (
                    <Image
                      src={process.env.REACT_APP_API_URL + thisProduct.imgMain}
                      style={{ width: "60%" }}
                    ></Image>
                  )}
                  <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFile}
                  />
                </Row>
                <Row className="d-flex justify-content-center">
                  {fileOne ? (
                    <Image
                      src={URL.createObjectURL(fileOne)}
                      style={{ width: "60%" }}
                    ></Image>
                  ) : (
                    <Image
                      src={process.env.REACT_APP_API_URL + thisProduct.imgFirst}
                      style={{ width: "60%" }}
                    ></Image>
                  )}
                  <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFileOne}
                  />
                </Row>
                <Row className="d-flex justify-content-center">
                  {fileTwo ? (
                    <Image
                      src={URL.createObjectURL(fileTwo)}
                      style={{ width: "60%" }}
                    ></Image>
                  ) : (
                    <Image
                      src={
                        process.env.REACT_APP_API_URL + thisProduct.imgSecond
                      }
                      style={{ width: "60%" }}
                    ></Image>
                  )}

                  <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFileTwo}
                  />
                </Row>
                <Row className="d-flex justify-content-center">
                  {fileThree ? (
                    <Image
                      src={URL.createObjectURL(fileThree)}
                      style={{ width: "60%" }}
                    ></Image>
                  ) : (
                    <Image
                      src={process.env.REACT_APP_API_URL + thisProduct.imgThird}
                      style={{ width: "60%" }}
                    ></Image>
                  )}
                  <Form.Control
                    className="mt-3"
                    type="file"
                    onChange={selectFileThree}
                  />
                </Row>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={changeProduct}>
          Изменить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangeProduct;
