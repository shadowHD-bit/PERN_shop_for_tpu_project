import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { fetchDeleteProduct, updateDisplayProduct } from "../../http/productAPI";
import ChangeProduct from "../modals/ChangeProduct";

const ProductItemAdmin = ({productItem, reRenderProduct }) => {
  const [changeProductData, setChangeProductData] = useState();
  const [changeVisible, setChangeVisible] = useState(false);
  const [temp, setTemp] = useState(false);

  const deleteProduct = (id) => {
    fetchDeleteProduct(id).then(() => {
      setTimeout(() => reRenderProduct(), 250);
    });
  };

  const changeProduct = (product) => {
    setChangeProductData(product);
    setChangeVisible(true);
  };

  const updateDisplay = (display, id) => {
    updateDisplayProduct({ display: !display, id }).then(() => {
      setTimeout(() => reRenderProduct(), 250);
    });
  };

  return (
    <>
      <tr key={productItem.id}>
        <td key={productItem.id}>{productItem.id}</td>
        <td key={productItem.name}>{productItem.name}</td>
        <td key={productItem.price}>{productItem.price}</td>
        <td key={productItem.rating + Math.random()}>{productItem.rating}</td>
        <td key={productItem.imgMain}>{productItem.imgMain}</td>
        <td key={productItem.createdAt}>{productItem.createdAt}</td>
        <td key={Math.random() + Math.random()}>
          <Button
            variant={"outline-danger"}
            onClick={() => deleteProduct(productItem.id)}
          >
            Удалить
          </Button>
        </td>
        <td key={Math.random() + Math.random()}>
          <Button
            variant={"outline-primary"}
            onClick={() => changeProduct(productItem)}
          >
            Изменить
          </Button>
        </td>
        <td>
          {productItem.display ? (
            <Button
              variant="success"
              onClick={() =>
                updateDisplay(productItem.display, productItem.id)
              }
            >
              +
            </Button>
          ) : (
            <Button variant="danger" onClick={() =>
                updateDisplay(productItem.display, productItem.id)
              }>-</Button>
          )}
        </td>
      </tr>

      <ChangeProduct
        show={changeVisible}
        onHide={() => setChangeVisible(false)}
        productChange={changeProductData}
        updatePage={() => setTemp(!temp)}
        reRenderProduct={reRenderProduct}
      />
    </>
  );
};
export default ProductItemAdmin;
