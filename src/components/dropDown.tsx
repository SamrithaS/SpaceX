import React from "react";
import { Dropdown } from "antd";

interface Idropdown{
    overlay:JSX.Element;
    src1:string;
    src2:string;
    content:string
}
function Dropdowns({ overlay, src1, src2, content }: Idropdown) {
  return (
    <Dropdown overlay={overlay} trigger={["click"]}>
      <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        <img src={src1} className="filter" alt="" />
        {content}
        <img src={src2} alt="" />
      </div>
    </Dropdown>
  );
}
export default Dropdowns;
