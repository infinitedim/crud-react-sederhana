/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Card from "./components/Card";

export const url = "https://musik98.herokuapp.com";

export default function App() {
  const [musics, setMusics] = useState([]);
  const [filteredMusic, setFilteredMusic] = useState([]);
  const [id, setId] = useState("");

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
    if (musics.length === 0) return;

    const filterByKeyword = musics.filter((music) => music.judul.includes(id));
    setFilteredMusic(filterByKeyword);
  }, [id]);

  useEffect(() => {
    getData();
  }, [setMusics]);

  useEffect(() => {
    async function fetchMusic() {
      await fetch(`${url}/users/data`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setMusics(res.data);
        })
        .catch((e) => e);
    }

    fetchMusic();
  }, [setMusics]);

  return (
    <main className="App">
      <nav className="navbar">
        <h1>Spotfoto</h1>
        <form onSubmit="">
          <input
            type="text"
            className="search"
            value={id}
            onChange={(e) => {
              // note: setId klo emng hanya untuk menerima value dari input search,
              //       mending jgn dicampur aduk sma data hasil fetch ya,
              //       kurang direkomendasiin, soalnya tipe datanya beda(string & array);
              setId(e.target.value);
            }}
          />
          <input type="submit" value="Cari" />
        </form>
      </nav>

      <Form postCallback={getData} />

      <div className="card-container">
        {filteredMusic.length > 0
          ? filteredMusic.map((music) => (
              <Card
                key={music._id}
                _id={music._id}
                judul={music.judul}
                penyanyi={music.penyanyi}
                musik={`${url}/${music.musik}`}
                callback={getData}
              />
            ))
          : musics.map((music) => (
              <Card
                key={music._id}
                _id={music._id}
                judul={music.judul}
                penyanyi={music.penyanyi}
                musik={`${url}/${music.musik}`}
                callback={getData}
              />
            ))}
      </div>
    </main>
  );
}
