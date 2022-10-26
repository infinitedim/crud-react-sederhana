// import Form from "./components/Form"
import { useEffect, useState } from "react";
import Card from "./components/Card";

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
    <div className="App">
      {musics.map((music, index) => (
        <Card
          key={index}
          judul={music.judul}
          penyanyi={music.penyanyi}
          musik={`https://musik98.herokuapp.com/${music.musik}`}
        />
      ))}
    </div>
  );
}
