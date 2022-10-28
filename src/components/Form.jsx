import { useState } from "react";
import { url } from "../App";

export default function Form() {
  const [judul, setJudul] = useState("");
  const [penyanyi, setPenyanyi] = useState("");
  const [musik, setMusik] = useState("");

  function post(e) {
    e.preventDefault();

    const formdata = new FormData(this);
    formdata.append("musik", musik);
    formdata.append("judul", judul);
    formdata.append("penyanyi", penyanyi);

    fetch("https://musik98.herokuapp.com/users/post", {
      method: "POST",
      mode: "no-cors",
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
  }

  return (
    <form className="form-post" onSubmit={post}>
      <label htmlFor="judul" />
      <input
        type="text"
        name="judul"
        id="judul"
        onChange={(e) => setJudul(e.target.value)}
      />
      <label htmlFor="penyanyi" />
      <input
        type="text"
        name="penyanyi"
        id="penyanyi"
        onChange={(e) => setPenyanyi(e.target.value)}
      />
      <label htmlFor="musik" />
      <input
        type="file"
        name="musik"
        id="musik"
        onChange={(e) => setMusik(e.target.files[0])}
      />
      <input type="submit" value="Upload new Song" />
    </form>
  );
}
