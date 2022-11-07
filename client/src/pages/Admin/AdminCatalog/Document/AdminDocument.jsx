import React from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Row,
  Form,
  Table,
} from "react-bootstrap";
import { AiFillFileExcel, AiOutlineDownload, AiOutlineMenuFold } from "react-icons/ai";
import SideBar from "../../../../components/UI/AdminSideBar/SideBar";
import {
  fetchBrandExcel,
  fetchOrderExcel,
  fetchProductExcel,
  fetchTypeExcel,
  fetchUserExcel,
} from "../../../../http/excelAPI";
import { createMoreProduct } from "../../../../http/productAPI";
import "./AdminDocument.scss";
import * as XLSX from "xlsx";
import ExcelItemAdmin from "../../../../components/AdminItems/ExcelItemAdmin";
import { Link } from "react-router-dom";

const AdminDocument = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const [showAlert, setShowAlert] = useState(true);

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };

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
    createMoreProduct(excelData).then((data) => handleCloseModalUpload());
  };

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

  const downloadPatternProduct = () => {
    let data = [
      {
        name: "",
        price: "",
        productBrandId: "",
        productTypeId: "",
        description: "",
      },
    ];
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Product");
    XLSX.writeFile(wb, "ProductPattern.xlsx");
  };

  return (
    <>
      <Container className="admin_container">
        <Row className="admin_title">
          <Col xs={12}>
            <Button
              variant="success"
              onClick={() => handleShowSidebar()}
              className="me-2"
            >
              <AiOutlineMenuFold />
            </Button>
            Админ-панель (v.1.2)
          </Col>
        </Row>
        <Row className="admin_subtitle">
          <Col xs={12}>Раздел "Документы"</Col>
        </Row>
        <Row>
          <Col xs={12}>
            {showAlert ? (
              <Alert
                variant="success"
                onClose={() => setShowAlert(false)}
                dismissible
              >
                <Alert.Heading>
                  Этот раздел предназначен для работы с документами...
                </Alert.Heading>
                <p>
                  Здесь ты можешь получить необходимые данные в формате .xlsx:
                </p>
                <ul>
                  <li>
                    Перейдите на определенную позицию в таблице и выберите
                    интересующий раздел
                  </li>
                  <li>
                    Если необходимо выгрузить данные, то прочитайте описание и
                    нажмите кнопку "Получить данные о ..."
                  </li>
                  <li>
                    Если необходимо загрузить данные, то прочитайте описание,
                    скачайте определенный формат документа, заполните его и
                    загрузите в модальное окно.
                  </li>
                </ul>
              </Alert>
            ) : (
              ""
            )}
          </Col>
        </Row>
        <Row>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getProductData()}
                  >
                    <AiFillFileExcel />
                    Получить данные о товарах
                  </Button>
                </td>
                <td>
                  Вы можете получить данные о всех товарах, которые представлены
                  на страницы в магазине для удобной работы с этими данными.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={handleShowModalUpload}
                  >
                    Загрузить данные товара
                  </Button>
                </td>
                <td>
                  Вы можете загрузить данные о товарах с помощью файла формата
                  xlsx. Для этого:
                  <ol>
                    <li>
                      Скачайте шаблон файла формата .xlsx{" "}
                      <Button variant="success" onClick={() => downloadPatternProduct()}>
                      <AiOutlineDownload />
                      </Button>
                      .
                    </li>
                    <li>Введите необходимые параметры товаров.</li>
                    <li>
                      Нажмите кнопку загрузить данные о товарах и загрузите
                      созданный файл формата .xlsx.
                    </li>
                    <li>
                      Перейди в админ-панел на страницу "Работа с товарами" и
                      загрузить недостающие параметры для товара.
                    </li>
                    <li>
                      Включите отображение товара на странице "Работа с
                      товарами" и товар отобразиться на главной странице.
                    </li>
                  </ol>
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getUserData()}
                  >
                    <AiFillFileExcel />
                    Получить данные о пользователях
                  </Button>
                </td>
                <td>
                  Вы можете получить данные о всех пользователях, которые
                  зарегистрированы в магазине для удобной работы с этими
                  данными.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getTypeData()}
                  >
                    <AiFillFileExcel />
                    Получить данные о типах
                  </Button>
                </td>
                <td>
                  {" "}
                  Вы можете получить данные о всех типах товарах, которые
                  представлены на страницы в магазине для удобной работы с этими
                  данными.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={() => getBrandData()}
                  >
                    <AiFillFileExcel />
                    Получить данные о брендах
                  </Button>
                </td>
                <td>
                  Вы можете получить данные о всех брендах товарах, которые
                  представлены на страницы в магазине для удобной работы с этими
                  данными.
                </td>
              </tr>
              <tr>
                <td>
                  <Button
                    className="w-100"
                    variant="success"
                    onClick={handleShowModal}
                  >
                    <AiFillFileExcel />
                    Получить данные о заказах
                  </Button>
                </td>
                <td>
                  {" "}
                  Вы можете получить данные о всех заказах, которыекоторые были
                  оформлены в магазине для удобной работы с этими данными. Для
                  этого:
                  <ol>
                    <li>Нажмите кнопку "Получить данные о заказах".</li>
                    <li>Выбирите статус заказа, который вас интересует.</li>
                  </ol>
                </td>
              </tr>
            </tbody>
          </Table>
        </Row>
      </Container>

      <SideBar show={showSidebar} handleClose={handleCloseSidebar} />

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Выбирите статус заказа
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
                  <ExcelItemAdmin excelData={excelData} />
                </tbody>
              </table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => getExcelData()}>
            Отобразить данные
          </Button>
          <Button
            onClick={() => uploadInDatabase()}
            variant="success"
            disabled={excelData != null ? false : true}
          >
            Загрузить данные
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default AdminDocument;
