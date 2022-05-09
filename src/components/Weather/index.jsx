import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { reqWeather } from "../../api/jsonp";
import "./index.less";
function Weather() {
  const [weather, setWeather] = useState({});
  const getWeather = async () => {
    const result = await reqWeather(
      "https://restapi.amap.com/v3/weather/weatherInfo",
      {
        city: "440600",
        key: "e727cc30f8bda48d7b7b14f24d5ddb2e",
      }
    );
    return setWeather(result);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="weather">
      <div className="weather-header">{weather.city}</div>
      <Row className="weather-main" justify="space-around">
        <Col>{weather.temperature}&#176;</Col>
        <Col>{weather.weather}</Col>
      </Row>
    </div>
  );
}
export default Weather;
