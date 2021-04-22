import { useState, useEffect } from "react";
type IList = {
  flight_number: number;
  mission_name: string;
  details: string;
  rocket: {
    rocket_id: string;
  };
}[];
interface Iapi {
  api: string;
  launch_success?: boolean;
  launch_failure?: boolean;
}
export const FetchList = ({ api, launch_success, launch_failure }: Iapi) => {
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
    const fetchApi = () => {
      return fetch(
        launch_success ? api.concat(`&launch_success=${launch_success}`) : api
      )
        .then(res => res.json())
        .then(val => {
          if (launch_failure) {
            let results: IList = [];
            val.map(
              (item: {
                flight_number: number;
                mission_name: string;
                details: string;
                launch_success: boolean;
                rocket: {
                  rocket_id: string;
                };
              }) => {
                if (item.launch_success === false) {
                  results.push(item);
                  
                }
                return results
              }
            );
            setDataSource(results);
          } else {
            setDataSource(val);
          }
        })
        .catch(err => console.error("err", err));
    };
    fetchApi();
  }, [api, launch_failure, launch_success]);

  return dataSource;
};
