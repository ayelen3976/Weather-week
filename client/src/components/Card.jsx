import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardDeck } from "react-bootstrap";
import Moment from "react-moment";
import "./Card.css";

function Cards(props) {
  return (
    <div className="carde">
      <button className="button" onClick={() => props.eliminar(props.id)}>
        X
      </button>
      <div>
        <h1 className="name">{props.dataName?.name}</h1>
      </div>
      <CardDeck>
        {props.data?.map((item) => (
          <Card key={item.id}>
            <Card.Body>
              <Card.Title>
                <Moment format="dddd">{item.dt_txt}</Moment>
              </Card.Title>
              <Card.Text>
                <img
                  className="city-icon"
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="img"
                />
              </Card.Text>
              <Card.Text>Max: {item.main.temp_max}°C</Card.Text>
              <Card.Text>Min: {item.main.temp_min}°C</Card.Text>
              <Card.Text>Pressure: {item.main.pressure}hPa</Card.Text>
              <Card.Text>humidity: {item.main.humidity}%</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </CardDeck>
    </div>
  );
}
export default Cards;
