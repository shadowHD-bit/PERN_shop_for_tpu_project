import React from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Modal,
  Offcanvas,
} from "react-bootstrap";
import {
  AiFillFileExcel,
  AiOutlineMenuFold,
  AiOutlineUser,
} from "react-icons/ai";
import { createMoreProduct, fetchProduct, getAllProductSearch } from "../../../http/productAPI";
import {
  ADMIN_BRANDANDTYPE_ROUTE,
  ADMIN_EXCEL_ROUTE,
} from "../../../utils/consts";
import * as XLSX from "xlsx";
import {
  fetchBrandExcel,
  fetchOrderExcel,
  fetchProductExcel,
  fetchTypeExcel,
  fetchUserExcel,
} from "../../../http/excelAPI";
import UploadData from "./UploadData";

const AdminExcel = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showModalUpload, setShowModalUpload] = useState(false);
  const handleCloseModalUpload = () => setShowModalUpload(false);
  const handleShowModalUpload = () => setShowModalUpload(true);

  const [file, setFile] = useState(null);
  const selectFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        setFile(null);
        setFile(e.target.result);
      };
    }
  };

  const [excelData, setExcelData] = useState(null);

  const getExcelData = () => {
    if (file) {
      const workbook = XLSX.read(file, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
  };

  const uploadInDatabase = () => {
    createMoreProduct(excelData).then(data => handleCloseModalUpload())
  }

  const getProductData = () => {
    fetchProductExcel().then((data) => {
      data.rows.forEach(function (element) {
        element.Бренд = element.product_brand.name;
        element.Тип = element.product_type.name;
        delete element.product_brand;
        delete element.product_type;
      });

      if (data) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(data.rows);
        XLSX.utils.book_append_sheet(wb, ws, "Product");
        XLSX.writeFile(wb, "ProductExcel.xlsx");
      }
    });
  };

  const getBrandData = () => {
    fetchBrandExcel().then((data) => {
      if (data) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Brands");
        XLSX.writeFile(wb, "BrandExcel.xlsx");
      }
    });
  };

  const getUserData = () => {
    fetchUserExcel().then((data) => {
      if (data) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "User");
        XLSX.writeFile(wb, "UserExcel.xlsx");
      }
    });
  };

  const getTypeData = () => {
    fetchTypeExcel().then((data) => {
      if (data) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Types");
        XLSX.writeFile(wb, "TypeExcel.xlsx");
      }
    });
  };

  const getOrderData = (complete) => {
    fetchOrderExcel({ complete: complete }).then((data) => {
      var all_data = [];

      data.rows.forEach(function (element) {
        var this_obj = {};
        this_obj = { ...element };

        element.order_products.forEach(function (in_obj) {
          let temp_obj = {};
          temp_obj = in_obj;
          this_obj = Object.assign({}, this_obj, { ...temp_obj });
          delete this_obj.order_products;
          all_data.push(this_obj);
        });
      });

      all_data.forEach(function (data) {
        data.Статус_доставки = data.Статус_заказа ? "Завершен" : "В пути";
        data.ФИ_пользователя = data.user.Имя + " " + data.user.Фамилия;
        delete data.user;
        delete data.ID;
        data.Наименование_товара = data.product.Наименование_товара;
        data.Бренд = data.product.product_brand.name;
        data.Тип = data.product.product_type.name;
        data.Цена_товара = data.product.Цена_товара;
        data.Количество_товара = data.Количество_товара;
        data.Итоговая_стоимость =
          Number(data.Цена_товара) * Number(data.Количество_товара);
        delete data.Статус_заказа;
        delete data.product;
      });

      if (data && all_data) {
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(all_data);
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, "OrdersExcel.xlsx");
      }
    });
  };

  return (
    <>
      <Container className="d-flex flex-column mb-2">
        <div className="d-flex">
          <Button variant="outline" onClick={toggleShow} className="me-2">
            <AiOutlineMenuFold />
          </Button>
          <h1>Админка (v. 1.0.1)</h1>
        </div>

        <Card className="mt-3">
          <Card.Title className="text-center">
            <h2 className="mt-2 ml-2">Работа с Excel</h2>
          </Card.Title>
          <Card.Body>
            <Container className="d-flex flex-column mb-2">
              <Button
                className="mb-2"
                variant="success"
                onClick={() => getProductData()}
              >
                <AiFillFileExcel />
                Выгрузить данные о всех товарах
              </Button>

              <Button
                className="mb-2"
                variant="success"
                onClick={handleShowModalUpload}
              >
                Загрузить данные товара
              </Button>

              <Button
                className="mb-2"
                variant="success"
                onClick={() => getUserData()}
              >
                <AiFillFileExcel />
                Выгрузить данные о всех пользователях
              </Button>

              <Button
                className="mb-2"
                variant="success"
                onClick={() => getTypeData()}
              >
                <AiFillFileExcel />
                Выгрузить данные о всех типах товаров
              </Button>

              <Button
                className="mb-2"
                variant="success"
                onClick={() => getBrandData()}
              >
                <AiFillFileExcel />
                Выгрузить данные о всех брендах
              </Button>

              <Button
                className="mb-2"
                variant="success"
                onClick={handleShowModal}
              >
                <AiFillFileExcel />
                Выгрузить данные о всех заказах
              </Button>
            </Container>
          </Card.Body>
        </Card>
      </Container>

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

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить статус заказа
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button className="mr-2" onClick={() => getOrderData("all")}>
            Все
          </Button>
          <Button className="mr-2" onClick={() => getOrderData("completed")}>
            Завершенные
          </Button>
          <Button
            className="mr-2"
            onClick={() => getOrderData("not-completed")}
          >
            Не завершенные
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalUpload}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleCloseModalUpload}
      >
        <Modal.Header closeButton>
          <Modal.Title>Импорт данный</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Загрузите файл в формате XLSX или XLS:
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <br />
          {!excelData ? (
            <div>Нет данных</div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Наименование</th>
                    <th scope="col">Цена</th>
                    <th scope="col">Описание</th>
                    <th scope="col">ID бренда</th>
                    <th scope="col">ID типа</th>
                  </tr>
                </thead>
                <tbody>
                  <UploadData excelData={excelData} />
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => getExcelData()}>
            Отобразить данные
          </Button>
          <Button onClick={() => uploadInDatabase()} variant="success" disabled={excelData != null ? false : true}>
            Загрузить данные
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminExcel;
