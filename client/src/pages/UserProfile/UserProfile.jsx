import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import { Context } from "../..";
import { fetchOrdersUser, getAllProductsOneUserOrders, getOneOrderProducts } from "../../http/orderAPI";
import { getData, updateUserData } from "../../http/userAPI";
import "./UserProfile.scss";

const UserProfile = observer(() => {
  const [changeData, setChangeData] = useState(false);
  const [load, setload] = useState(false);
  const { user } = useContext(Context);

  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [date_birthday, setDate_birthday] = useState("");
  const [numberPhone, setNumberPhone] = useState("");

  const [showModalPhoto, setShowModalPhoto] = useState(false);

  const [file, setFile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [ordersProduct, setOrdersProduct] = useState([]);

  const handlerModalPhotoShow = () => setShowModalPhoto(true);
  const handlerModalPhotoSClose = () => setShowModalPhoto(false);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };


  useEffect(() => {
    getData(user.user.id).then((data) => {
      user.setUserProf(data);
      setName(user.userProf.name);
      setFamily(user.userProf.family);
      setDate_birthday(user.userProf.date_birthday);
      setNumberPhone(user.userProf.numberPhone);
    });
  }, []);

  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    getData(user.user.id).then((data) => {
      user.setUserProf(data);
      setName(user.userProf.name);
      setFamily(user.userProf.family);
      setDate_birthday(user.userProf.date_birthday);
      setNumberPhone(user.userProf.numberPhone);
    });
  }, [rerender]);

  const reRender = () => {
    setRerender(!rerender);
  };

  const changeDataUser = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("family", family);
    formData.append("numberPhone", numberPhone);
    formData.append("date_birthday", date_birthday);
    formData.append("img", file);
    updateUserData(user.userProf.id, formData).then((data) => {
      setChangeData(false);
      if (showModalPhoto) {
        handlerModalPhotoSClose();
      }
      reRender();
    });
  };

  return (
    <Container fluid>
      <div className="container rounded bg-white mt-5 mb-5 profile">
        <div className="row">
          <div className="col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src={process.env.REACT_APP_API_URL + user.userProf.img_user}
              />
              <span className="font-weight-bold">
                {user.userProf.name} {user.userProf.family}
              </span>
              <span className="text-black-50"></span>
              <Button className="change_photo_btn" onClick={() => handlerModalPhotoShow()}>
                Изменить аватар
              </Button>
              <span> </span>
            </div>
          </div>
          <div className="col-md-8">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Информация о профиле</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Имя</label>
                  <input
                    disabled={!changeData ? true : false}
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Фамилия</label>
                  <input
                    disabled={!changeData ? true : false}
                    type="text"
                    className="form-control"
                    value={family}
                    placeholder="surname"
                    onChange={(e) => setFamily(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Номер телефона</label>
                  <input
                    disabled={!changeData ? true : false}
                    type="text"
                    className="form-control"
                    placeholder="enter phone number"
                    value={numberPhone}
                    onChange={(e) => setNumberPhone(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Дата рождения</label>
                  <input
                    disabled={!changeData ? true : false}
                    type="date"
                    className="form-control"
                    placeholder="enter address line 1"
                    value={date_birthday}
                    onChange={(e) => setDate_birthday(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Почта</label>
                  <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value={user.userProf.email}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Роль</label>
                  <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    placeholder="enter address line 2"
                    value={user.userProf.role}
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels">Дата регистрации</label>
                  <input
                    disabled={true}
                    type="datetime"
                    className="form-control"
                    placeholder="enter address line 2"
                    value={user.userProf.createdAt}
                  />
                </div>
              </div>

              {!changeData ? (
                <div className="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={() => setChangeData(true)}
                  >
                    Изменить
                  </button>
                </div>
              ) : (
                <div class="mt-5 text-center">
                  <button
                    className="btn btn-primary profile-button"
                    type="button"
                    onClick={() => changeDataUser()}
                  >
                    Сохранить
                  </button>
                  <button
                    className="btn btn-primary profile-button ml-2"
                    type="button"
                    onClick={() => setChangeData(false)}
                  >
                    Отмена
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModalPhoto} onHide={handlerModalPhotoSClose} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Изменить аватар
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="flex justify-content-center">
            {file === null ? (
              <div
                className="test_avatar"
                style={{
                  backgroundImage: `url(${
                    process.env.REACT_APP_API_URL + user.userProf.img_user
                  })`,
                }}
              ></div>
            ) : (
              <div
                className="test_avatar"
                style={{
                  backgroundImage: `url(${URL.createObjectURL(file)})`,
                }}
              ></div>
            )}
          </Row>
          <Row>
            <Form.Control className="mt-3" type="file" onChange={selectFile} />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => changeDataUser()}>Изменить</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
});

export default UserProfile;
