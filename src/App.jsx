/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Card from "./components/Card";

export const url = "https://musik98.herokuapp.com";

export default function App() {
  const [musics, setMusics] = useState([]);
  const [id, setId] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  const formdata = new FormData(this);
  formdata.append("_id", id);

  function getData() {
    fetch(`${url}/users/data`, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setMusics(() => res.data);
      })
      .catch((e) => e);
  }

  useEffect(() => {
    getData();
  }, [setMusics]);

  function getId(id) {
    fetch(`${url}/users/data/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setId(res.data);
        console.log(res.data);
      })
      .catch((e) => e);
  }

  return (
    <main className="App">
      <nav className="navbar">
        <h1>Spotfoto</h1>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            getId(id);
          }}
        >
          <input
            type="text"
            className="search"
            onChange={(e) => setId(e.target.value)}
          />
          <input type="submit" value="Cari" />
        </form>
      </nav>

      <Form postCallback={getData} />

      <div className="card-container">
        {musics.map((music) => (
          <Card
            key={music._id}
            _id={music._id}
            judul={music.judul}
            penyanyi={music.penyanyi}
            musik={`${url}/${music.musik}`}
            onClickEdit={() => setSelectedId(music._id)}
            callback={getData}
          />
        ))}
      </div>
    </main>
  );
}
