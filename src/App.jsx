/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Card from "./components/Card";

export const url = "https://musik98.herokuapp.com";

export default function App() {
  const [musics, setMusics] = useState([]);
  const [id, setId] = useState(""); // hanya untuk keyword pencarian
  const [fetchedData, setData] = useState([]); // menerima data hasil pencarian

  // const formdata = new FormData(this);
  // formdata.append("_id", id);

  async function getId(id) {
    await fetch(`${url}/users/data/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data); // setId(res.data) - jgn dicampur aduk sma keyword utk mencari data musiknya ya, mending buat state baru untuk memasukkan data hasil fetch ini
        // console.log(res.data);
      })
      .catch((e) => e);
  }

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
      <Form />

      <div className="card-container">
        {/* Conditional rendering */}
        {fetchedData.length > 0 ? (
          <>
            {fetchedData.map((music) => (
              <Card
                key={music._id}
                _id={music._id}
                judul={music.judul}
                penyanyi={music.penyanyi}
                musik={`${url}/${music.musik}`}
              />
            ))}
          </>
        ) : (
          <>
            {musics.map((music) => (
              <Card
                key={music._id}
                _id={music._id}
                judul={music.judul}
                penyanyi={music.penyanyi}
                musik={`${url}/${music.musik}`}
              />
            ))}
          </>
        )}
      </div>
    </main>
  );
}
