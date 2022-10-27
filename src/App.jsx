/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import Form from "./Components/Form";
import Card from "./Components/Card";

const url = "https://musik98.herokuapp.com";

export default function App() {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    fetch(`${url}/users/data`)
      .then((res) => res.json())
      .then((res) => {
        setMusics(res.data);
      })
      .catch((e) => console.error(e));
  }, [setMusics]);

  return (
    <main className="App">
      <Form />
      {musics.map((music) => (
        <Card
          key={music._id}
          judul={music.judul}
          penyanyi={music.penyanyi}
          musik={`${url}/${music.musik}`}
        />
      ))}
    </main>
  );
}
