import React from "react";
import "./SizeProductModal.scss";
import { useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  InputGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";

const SizeProductModal = ({ stateModal, handleCloseModal }) => {
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={stateModal}
        onHide={handleCloseModal}
        className="modal_add_question"
      >
        <Modal.Header closeButton>
          <Modal.Title>Таблица размеров</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped>
            <thead>
              <tr>
                <th>Российский размер</th>
                <th>Размер производителя</th>
                <th>Обхват бедер, в см</th>
                <th>Обхват талии, в см</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>42</td>
                <td>42</td>
                <td>94-98</td>
                <td>62-66</td>
              </tr>
              <tr>
                <td>43</td>
                <td>43</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
              <tr>
                <td>44</td>
                <td>44</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
              <tr>
                <td>45</td>
                <td>45</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
              <tr>
                <td>46</td>
                <td>46</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
              <tr>
                <td>47</td>
                <td>47</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
              <tr>
                <td>48</td>
                <td>48</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
              <tr>
                <td>43</td>
                <td>43</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
              <tr>
                <td>49</td>
                <td>49</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
              <tr>
                <td>50</td>
                <td>50</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
              <tr>
                <td>51</td>
                <td>51</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
              <tr>
                <td>52</td>
                <td>52</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
              <tr>
                <td>53</td>
                <td>53</td>
                <td>98-102</td>
                <td>66-70</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SizeProductModal;
