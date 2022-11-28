import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { BsTrash, BsTrash2Fill, BsTrashFill } from "react-icons/bs";
import { Context } from "../..";
import {
  deleteNotification,
  fetchNotificationOneUser,
} from "../../http/notificationAPI";
import "./NotificationPage.scss";

const NotificationPage = () => {
  const { user, notifications } = useContext(Context);

  const [notification, setNotification] = useState([]);
  useEffect(() => {
    fetchNotificationOneUser(user.user.id).then((data) => {
      setNotification(data.rows);
      notifications.setNotification(data.rows);
      notifications.setCount(data.count);
    });
  }, []);

  const deleteNotificationInPage = (id) => {
    deleteNotification(id).then((data) => {
      fetchNotificationOneUser(user.user.id).then((data) => {
        setNotification(data.rows);
        notifications.setNotification(data.rows);
        notifications.setCount(data.count);
      });
    });
  };

  return (
    <>
      <Container className="notification_container">
        {notification.length !== 0 ? (
          notification?.map((item) => (
            <Card className="notification_card">
              <Card.Body>
                <Row className="d-flex flex-row justify-content-center align-items-center">
                  <Col xs={10}>{item.notification_message}</Col>
                  <Col xs={2} className="d-flex justify-content-end">
                    <Button
                      variant="danger"
                      onClick={() => deleteNotificationInPage(item.id)}
                    >
                      <BsTrashFill />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Row>
            <Col xs={12} className="d-flex flex-row justify-content-center align-items-center mt-5">
              <Image
                src={process.env.PUBLIC_URL + "/img/productcard/tea-time.png"}
                width="200"
              />
            </Col>
            <Col className="text-center mt-5" style={{ fontSize: 28 }} xs={12}>
              Вам еще не приходили уведомления...
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};
export default NotificationPage;
