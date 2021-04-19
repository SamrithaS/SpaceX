import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import group from "./Group.svg";
import arrow from "./arrow.svg";
import filter from "./filter.svg";
import calendar from "./calendar.svg";
import "./App.css";
import { FetchList } from "./Api";
import { Table, Tag, Dropdown, Menu} from "antd";
import "antd/dist/antd.css";
import "./index.css";
function App() {
  const [filterType, setFilterType] = useState<string>("All Launches");

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
          dataSource={FetchList(
            "https://api.spacexdata.com/v3/launches?limit=80&offset=0"
          )}
          columns={columns}
        />
      </div>
    </div>
  );
}

export default App;
