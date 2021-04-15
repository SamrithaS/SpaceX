import React from 'react';
export const fetchList = async() => {
    //fn return type
    return fetch("https://api.spacexdata.com/v3/launches?limit=20&offset=0")
      .then(res => {res.json();
        return res}
      )
     
      .catch(err => console.error("err", err));
  };