import React, { useState } from "react";
import group from "./svgs/Group.svg";
import arrow from "./svgs/arrow.svg";
import filter from "./svgs/filter.svg";
import calendar from "./svgs/calendar.svg";
import Modals from "./components/Modal";
import Dropdowns from "./components/dropDown";
import "./App.css";
import { FetchList } from "./Api";
import { Table, Tag, Menu } from "antd";
import "antd/dist/antd.css";
import "./index.css";

export interface Idetails {
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

  interface IList {
    flight_number: number;
    mission_name: string;
    details: string;
    launch_success: boolean;
    rocket: {
      rocket_name: string;
      rocket_id: string;
      second_stage: {
        payloads: {
          orbit: string;
          manufacturer: string;
          nationality: string;
        }[];
      };
      rocket_type: string;
    };
  }
  const showModal = (record: IList) => {
    setDetails({
      mission_name: record.mission_name,
      rocket_name: record.rocket.rocket_name,
      launch_status: record.launch_success,
      orbit: record.rocket.second_stage.payloads[0].orbit,
      details: record.details,
      flight_number: record.flight_number,
      rocket_type: record.rocket.rocket_type,
      manufacturer: record.rocket.second_stage.payloads[0].manufacturer,
      nationality: record.rocket.second_stage.payloads[0].nationality
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

  const onClick = (event: { item: { props: { children: string[] } } }) => {
    setFilterType(event.item.props.children[1]);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">All Launches</Menu.Item>
      <Menu.Item key="2">Successful Launches</Menu.Item>
      <Menu.Item key="3">Failed Launches</Menu.Item>
    </Menu>
  );
  const menu2 = (
    <Menu>
      <Menu.Item key="1">past week</Menu.Item>
      <Menu.Item key="2">past month</Menu.Item>
      <Menu.Item key="3">past 3 months</Menu.Item>
      <Menu.Item key="3">past 6 months</Menu.Item>
      <Menu.Item key="3">past year</Menu.Item>
      <Menu.Item key="3">past 2 years</Menu.Item>
    </Menu>
  );
  return (
    <div className="App">
      <div className="svg-wrapper">
        <img src={group} alt="" />
      </div>
      <Modals
        handleCancel={handleCancel}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        details={details}
      />
      <div className="wrapper">
        <div className="flex">
          <Dropdowns
            overlay={menu2}
            src1={calendar}
            src2={arrow}
            content="Past 6 Months"
          />
          <Dropdowns
            overlay={menu}
            src1={filter}
            src2={arrow}
            content={filterType}
          />
        </div>
        <Table
          onRow={(record: IList) => ({
            onClick: () => showModal(record)
          })}
          dataSource={FetchList({
            api: "https://api.spacexdata.com/v3/launches?limit=50&offset=0",
            launch_success: filterType === "Successful Launches" ? true : false,
            launch_failure: filterType === "Failed Launches" ? true : false
          })}
          columns={columns}
        />
      </div>
    </div>
  );
}

export default App;
