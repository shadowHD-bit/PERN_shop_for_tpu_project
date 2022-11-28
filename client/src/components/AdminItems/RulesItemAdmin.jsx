import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { BsPen, BsTrashFill } from "react-icons/bs";
import { deleteRules } from "../../http/rulesAPI";
import ChangeRules from "../modals/ChangeRules";

const RulesItemAdmin = ({ reRender, item }) => {
  const [showChangeModal, setShowChangeModal] = useState(false);

  const handleShowChangeModal = () => {
    setShowChangeModal(true);
  };

  const handleCloseChangeModal = () => {
    setShowChangeModal(false);
  };

  const deleteRule = (id) => {
    deleteRules(id).then((data) => {
      reRender();
    });
  };

  return (
    <>
      <tr>
        <td>{item.id}</td>
        <td>{item.name_rules}</td>
        <td>
          <Button variant="warning" onClick={() => handleShowChangeModal()}>
            <BsPen />
          </Button>
        </td>
        <td>
          <Button variant="danger" onClick={() => deleteRule(item.id)}>
            <BsTrashFill />
          </Button>
        </td>
      </tr>

      <ChangeRules
        show={showChangeModal}
        onHide={handleCloseChangeModal}
        id_rule={item.id}
        reRender={reRender}
      />
    </>
  );
};
export default RulesItemAdmin;
