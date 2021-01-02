import React, { useState, useEffect } from "react";
import "./Details.css";
import axios from "axios";

import Hour from "./Hour";
import Day from "./Day";

const Details = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hours, setHours] = useState([]);
  const [days, setDays] = useState([]);

  // console.log(data);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `https://myweather-backend.herokuapp.com/weather/details`,
          {
            lat: data.coord.lat,
            lon: data.coord.lon,
          }
        );

        console.log(response.data);

        if (response.status === 200) {
          setHours(response.data.hourly);
          setDays(response.data.daily);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [data.id]);

  // console.log(hours);

  return (
    <div className="Details">
      {isLoading ? (
        <></>
      ) : (
        <>
          <div className="Details-hours-container">
            {hours.map((item, index) => {
              if (index < 24) {
                return <Hour key={item.dt} item={item} />;
              }
            })}
          </div>
          <div className="Details-days-container">
            {days.map((item, index) => {
              if (index < 7) {
                return <Day key={item.dt} item={item} />;
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
