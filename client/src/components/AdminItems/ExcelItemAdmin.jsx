import React from "react";

const ExcelItemAdmin = ({ excelData }) => {
  return excelData.map((prod) => (
    <tr>
      <th>{prod.name}</th>
      <th>{prod.price}</th>
      <th>{prod.description}</th>
      <th>{prod.productBrandId}</th>
      <th>{prod.productTypeId}</th>
    </tr>
  ));
};
export default ExcelItemAdmin;
