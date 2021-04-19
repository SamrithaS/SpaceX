import React,{useState, useEffect} from 'react';
type IList = {
    flight_number: number;
    mission_name: string;
    details: string;
    rocket: {
      rocket_id: string;
    };
  }[];
export const FetchList = (api:string) => {
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
        const fetchApi = async () => {
            return fetch(api)
      .then(res => res.json())
      .then(val => {
        setDataSource(val);
      })
      .catch(err => console.error("err", err));
        }
        fetchApi();
        
    })
    
    return dataSource
  };