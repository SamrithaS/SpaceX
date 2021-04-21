import React, { useState } from "react";
import group from "./Group.svg";
import arrow from "./arrow.svg";
import filter from "./filter.svg";
import calendar from "./calendar.svg";
import "./App.css";
import { FetchList } from "./Api";
import { Table, Tag, Dropdown, Menu, Modal } from "antd";
import "antd/dist/antd.css";
import "./index.css";
function App() {
  const [filterType, setFilterType] = useState<string>("All Launches");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [details, setDetails] = useState<Idetails>({
    mission_name: "",
    rocket_name: "",
    launch_status: false,
    orbit: "",
    details: "",
    flight_number: 0,
    rocket_type: "",
    manufacturer: "",
    nationality: ""
  });
  interface Idetails {
    mission_name: string;
    rocket_name: string;
    launch_status: boolean;
    orbit: string;
    details: string;
    flight_number: number;
    rocket_type: string | number;
    manufacturer: string;
    nationality: string;
  }

  const showModal = (r: any) => {
    setDetails({
      mission_name: r.mission_name,
      rocket_name: r.rocket.rocket_name,
      launch_status: r.launch_success,
      orbit: r.rocket.second_stage.payloads[0].orbit,
      details: r.details,
      flight_number: r.flight_number,
      rocket_type: r.rocket.rocket_type,
      manufacturer: r.rocket.second_stage.payloads[0].manufacturer,
      nationality: r.rocket.second_stage.payloads[0].nationality
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "flight_number",
      key: "flight_number"
    },
    {
      title: "Launched (UTC)",
      dataIndex: "launch_date_utc",
      key: "launch_date_utc"
    },
    {
      title: "Location",
      dataIndex: ["launch_site", "site_name"],
      key: "Location"
    },
    {
      title: "Mission",
      dataIndex: "mission_name",
      key: "mission_name"
    },
    {
      title: "Orbit",
      dataIndex: ["rocket", "second_stage", "payloads", "0", "orbit"],
      key: "mission_name"
    },
    {
      title: "Launch Status",
      dataIndex: "launch_success",
      key: "launch_success",
      render: (tags: {}[]) => (
        <>
          <Tag className={tags ? "green" : "red"} key={1}>
            {tags ? "Success" : "Failed"}
          </Tag>
        </>
      )
    },
    {
      title: "Rocket",
      dataIndex: ["rocket", "rocket_name"],
      key: "Rocket"
    }
  ];

  const onClick = (event: any): any => {
    setFilterType(event.item.props.children[1]);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">All Launches</Menu.Item>
      <Menu.Item key="2">Successful Launches</Menu.Item>
      <Menu.Item key="3">Failed Launches</Menu.Item>
    </Menu>
  );

  return (
    <div className="App">
      <div className="svg-wrapper">
        <img src={group} />
      </div>

      <div className="wrapper">
        <div className="flex">
          <Dropdown overlay={menu} trigger={["click"]}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <img src={calendar} className="filter" />
              Past 6 Months
              <img src={arrow} />
            </a>
          </Dropdown>
          <Dropdown overlay={menu} trigger={["click"]}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <img src={filter} className="filter" />
              {filterType}
              <img src={arrow} />
            </a>
          </Dropdown>
        </div>
        <Table
          onRow={(r: any) => ({
            onClick: () => showModal(r)
          })}
          dataSource={FetchList({
            api: "https://api.spacexdata.com/v3/launches?limit=50&offset=0",
            launch_success: filterType === "Successful Launches" ? true : false,
            launch_failure: filterType === "Failed Launches" ? true : false
          })}
          columns={columns}
        />
      </div>
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
    </div>
  );
}

export default App;
