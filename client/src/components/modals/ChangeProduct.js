import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Form, Button, Image } from "react-bootstrap";
import { updateProduct } from "../../http/productAPI";
import UpdatePageDataProducts from "../../pages/Admin/Admin";

const ChangeProduct = ({ show, onHide, productChange, updatePage, reRenderProduct}) => {
  const thisProduct = { ...productChange };
  const id = thisProduct.id;
  const name = thisProduct.name;
  const price = thisProduct.price;
  const rating = thisProduct.rating;
  const imgMain = thisProduct.imgMain;
  const imgFirst = thisProduct.imgFirst;
  const imgSecond = thisProduct.imgSecond;
  const imgThird = thisProduct.imgThird;

  const BrandId = thisProduct.productBrandId;
  const TypeId = thisProduct.productTypeId;

  const [valueName, setValueName] = useState(name || "");
  const [valuePrice, setValuePrice] = useState(price || "");
  const [valueRating, setValueRating] = useState(rating || "");
  const [valueImgMain, setValueImgMain] = useState(imgMain || "");

  const [valueImgFirst, setValueImgFirst] = useState(imgFirst || "");
  const [valueImgSecond, setValueImgSecond] = useState(imgSecond || "");
  const [valueImgThird, setValueImgThird] = useState(imgThird || "");

  const [file, setFile] = useState(null);
  const [fileOne, setFileOne] = useState(null);
  const [fileTwo, setFileTwo] = useState(null);
  const [fileThree, setFileThree] = useState(null);

  const [valueBrand, setValueBrand] = useState(BrandId || "");
  const [valueType, setValueType] = useState(TypeId || "");

  const selectFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e);
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
  }, [name, price, rating, imgMain, BrandId, TypeId]);

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
    console.log(formData);
    updateProduct(id, formData).then(() => {
      setTimeout(() => reRenderProduct(), 250);
  });
    onHide();
    updatePage();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Название товара</Form.Label>
            <Form.Control
              className="mb-1"
              value={valueName || ""}
              onChange={(nameProduct) => setValueName(nameProduct.target.value)}
              placeholder={"Введите название типа"}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Цена товара</Form.Label>
            <Form.Control
              className="mb-1"
              value={valuePrice || ""}
              onChange={(e) => setValuePrice(e.target.value)}
              placeholder={"Введите название типа"}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Главная фотография</Form.Label>
            {file ? (
              <Image
                src={URL.createObjectURL(file)}
                style={{ width: "30%" }}
              ></Image>
            ) : (
              <Image
                src={process.env.REACT_APP_API_URL + thisProduct.imgMain}
                style={{ width: "30%" }}
              ></Image>
            )}
            <Form.Control className="mt-3" type="file" onChange={selectFile} />
            <Form.Label>Первая фотография</Form.Label>
            {fileOne ? (
              <Image
                src={URL.createObjectURL(fileOne)}
                style={{ width: "30%" }}
              ></Image>
            ) : (
              <Image
                src={process.env.REACT_APP_API_URL + thisProduct.imgFirst}
                style={{ width: "30%" }}
              ></Image>
            )}
            <Form.Control
              className="mt-3"
              type="file"
              onChange={selectFileOne}
            />
            <Form.Label>Вторая фотография</Form.Label>
            {fileTwo ? (
              <Image
                src={URL.createObjectURL(fileTwo)}
                style={{ width: "30%" }}
              ></Image>
            ) : (
              <Image
                src={process.env.REACT_APP_API_URL + thisProduct.imgSecond}
                style={{ width: "30%" }}
              ></Image>
            )}
            <Form.Control
              className="mt-3"
              type="file"
              onChange={selectFileTwo}
            />
            <Form.Label>Третья фотография</Form.Label>
            {fileThree ? (
              <Image
                src={URL.createObjectURL(fileThree)}
                style={{ width: "30%" }}
              ></Image>
            ) : (
              <Image
                src={process.env.REACT_APP_API_URL + thisProduct.imgThird}
                style={{ width: "30%" }}
              ></Image>
            )}
            <Form.Control
              className="mt-3"
              type="file"
              onChange={selectFileThree}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Бренд</Form.Label>
            <Form.Control
              className="mb-1"
              value={valueBrand || ""}
              onChange={(e) => setValueBrand(e.target.value)}
              placeholder={"Введите название типа"}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Тип</Form.Label>
            <Form.Control
              className="mb-1"
              value={valueType || ""}
              onChange={(e) => setValueType(e.target.value)}
              placeholder={"Введите название типа"}
            />
          </Form.Group>
        </Form>
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
