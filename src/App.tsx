import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Table } from "antd";
import "antd/dist/antd.css";
import "./index.css";
function App() {
  type IList = {
    flight_number: number;
    mission_name: string;
    details: string;
    rocket: {
      rocket_id: string;
    };
  }[];
  interface IlistItems {
    flight_number: number;
    mission_name: string;
    details: string;
    rocket: {
      rocket_id: string;
    };
  }
  const [dataSource, setDataSource] = useState<IList>([
    {
      flight_number: 0,
      mission_name: "",
      details: "",
      rocket: {
        rocket_id: ""
      }
    }
  ]);

  useEffect(() => {
    fetchList();
  },[]);

  const fetchList = () => {
    return fetch("https://api.spacexdata.com/v3/launches?limit=50&offset=0")
      .then(res => res.json())
      .then(val => {
        setDataSource(val);
      })
      .catch(err => console.error("err", err));
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
      dataIndex: ["launch_site","site_name"],
      key: "Location"
    },
    {
      title: "Mission",
      dataIndex: "mission_name",
      key: "mission_name"
    },
    {
      title: "Orbit",
      dataIndex: ["rocket","rocket_type"],
      key: "mission_name"
    },
    {
      title: "Launch Status",
      dataIndex: "launch_year",
      key: "launch_success"
    }, 
    {
      title: "Rocket",
      dataIndex: ["rocket","rocket_name"],
      key: "Rocket"
    }

  ];
  console.log(dataSource);
  return (
    <div className="App">
      <Table
        dataSource={dataSource}
        columns={columns}
      />

      {/* <Button type="primary">Button</Button> */}
    </div>
  );
}

export default App;
