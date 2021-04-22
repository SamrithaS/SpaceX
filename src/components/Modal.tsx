import React from "react";
import { Tag, Modal } from "antd";
import { Idetails } from "../App";

interface IModal {
  handleCancel: () => void;
  isModalVisible: boolean;
  handleOk: () => void;
  details: Idetails;
}

function Modals({ handleCancel, isModalVisible, handleOk, details }: IModal) {
  return (
    <Modal
      title=""
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer=""
    >
      <div>
        <div className="flex-center">
          <div>
            <p className="name">{details.mission_name}</p>
            <p className="number">{details.flight_number}</p>
          </div>
          <p>
            {" "}
            <Tag className={details.launch_status ? "green" : "red"} key={1}>
              {details.launch_status ? "Success" : "Failed"}
            </Tag>
          </p>
        </div>
        <p className="details">
          {details.details ? details.details : "No details available"}
        </p>
        <div className="wrap">
          <p>Flight Number</p>
          <p>{details.flight_number}</p>
        </div>
        <div className="wrap">
          <p>Mission Name</p>
          <p>{details.mission_name}</p>
        </div>
        <div className="wrap">
          <p>Rocket Type</p>
          <p>{details.rocket_type}</p>
        </div>
        <div className="wrap">
          <p>Rocket Name</p>
          <p>{details.rocket_name}</p>
        </div>
        <div className="wrap">
          <p>Manufacturer</p>
          <p>{details.manufacturer}</p>
        </div>
        <div className="wrap">
          <p>Nationality</p>
          <p>{details.nationality}</p>
        </div>
        <div className="wrap">
          <p>Orbit</p>
          <p>{details.orbit}</p>
        </div>
      </div>
    </Modal>
  );
}
export default Modals;
