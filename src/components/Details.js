import React, { useState, useEffect } from "react";
import "./Details.css";
import axios from "axios";

import Hour from "./Hour";
import Day from "./Day";

const Details = ({ API, data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hours, setHours] = useState([]); // will get the weather details by hours
  const [days, setDays] = useState([]); // will get the weather details by days

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(`${API}/weather/details`, {
          lat: data.coord.lat,
          lon: data.coord.lon,
        });

        if (response.status === 200) {
          setHours(response.data.hourly);
          setDays(response.data.daily);
          setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [API, data.coord.lat, data.coord.lon]);

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
              return <></>;
            })}
          </div>
          <div className="Details-days-container">
            {days.map((item, index) => {
              if (index < 7) {
                return <Day key={item.dt} item={item} />;
              }
              return <></>;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Details;
