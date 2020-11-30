import React, { useState } from "react";
import "./App.css";
import Nave from "./components/Nav";
import Cards from "./components/Card";
import axios from "axios";

const api = {
  key: "438eb28db410332a45649651b0edc41a",
};

function App() {
  //iniciamos los estados que tendran informacion
  const [cities, setCities] = useState("");
  const [list, setList] = useState([]);
  //con la funcion search requerimos la ciudad que buscamos de la api
  const Search = () => {
    const fetchData = async () => {
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cities}&appid=${api.key}&units=metric`
      );
      //con const 'list2' agrupamos las horas segun los proximos 5 dias
      const list2 = data.data.list.reduce((group, res) => {
        const date = new Date(res.dt_txt).getDate();
        if (!group.get(date)) {
          group.set(date, res);
        }
        return group;
      }, new Map());
      data.data.list = Array.from(list2.values());

     //con const 'exist' comprobamos si existe la card con la data para no repetirla
      const exist = list.find((item) => item.city.id === data.data.city.id);
      if (!exist) {
        setList([...list, data.data]);
      } else {
        alert("La ciudad ya se encuentra");
      }
    };

    return fetchData();
  };

//la funcion eliminar , elimina la card segun el id
  function eliminar(id) {
    console.log("id", id);
    setList(list.filter((item) => item.city.id !== id));
  }

  return (
    <div className="App">
      <Nave Search={Search} cities={cities} setCities={setCities} />

      {/* hacemos un map en cards para que renderize todas las de mi estado list que ya busque */}
      {list.map((item) => (
        <Cards
          id={item.city.id}
          data={item.list}
          dataName={item.city}
          eliminar={eliminar}
        />
      ))}
    </div>
  );
}

export default App;
