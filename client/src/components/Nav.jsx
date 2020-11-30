import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, FormControl, Button, Form } from "react-bootstrap";

function Nave(props) {
  //la funcion submit es para que no se recargue el form
  function onSubmitHandler(e) {
    e.preventDefault();
    props.Search(props.cities);
  }
  //la funcion onchange controla lo que escribimos en el imput del from
  function onChangeHandler(e) {
    e.preventDefault();
    props.setCities(e.target.value);
  }
  return (
    <div>
      <Navbar bg="dark" variant="light">
        <Navbar.Brand style={{ color: "white" }}>WeatherApp</Navbar.Brand>
        <Nav className="mr-auto"></Nav>
        <Form inline style={{ display: "contents" }} onSubmit={onSubmitHandler}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={props.city}
            onChange={onChangeHandler}
          />
          <Button variant="outline-primary" onClick={props.Search}>
            Search
          </Button>
        </Form>
      </Navbar>
    </div>
  );
}
export default Nave;
