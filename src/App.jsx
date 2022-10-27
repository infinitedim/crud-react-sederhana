import { useEffect, useState } from "react";
import Form from "./Components/Form";
import Card from "./Components/Card";
// import Navbar from "./Components/Navbar";

export default function App() {
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    fetch("https://musik98.herokuapp.com/users/data")
      .then((res) => res.json())
      .then((res) => {
        setMusics(res.data);
      })
      .catch((e) => e);
  }, [setMusics]);

  return (
    <main className="App">
      {/* <Navbar /> */}
      <Form />
      {musics.map((music, index) => (
        <Card
          key={index}
          judul={music.judul}
          penyanyi={music.penyanyi}
          musik={`https://musik98.herokuapp.com/${music.musik}`}
        />
      ))}
    </main>
  );
}
