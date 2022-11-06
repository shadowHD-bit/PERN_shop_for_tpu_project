import React from "react";
import { Toast } from "react-bootstrap";
import "./InfoToast.scss";

const InfoToast = ({ handleCloseToast, children, who, showToast }) => {
    return (
      <>
        <Toast onClose={handleCloseToast()} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">{who}</strong>
          </Toast.Header>
          <Toast.Body>{children}</Toast.Body>
        </Toast>
      </>
    );

};
export default InfoToast;
