import { useState } from "react";

export default function Form() {
  const url = "https://musik98.herokuapp.com";
  const [judul, setJudul] = useState("");
  const [penyanyi, setPenyanyi] = useState("");
  const [musik, setMusik] = useState("");

  function post(e) {
    e.preventDefault();

    const formdata = new FormData(this);
    formdata.append("muslk", musik);
    formdata.append("judul", judul);
    formdata.append("penyanyi", penyanyi);

    fetch(`${url}/users/post`, {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((e) => console.error(e));

    console.log(musik);
  }

  return (
    <form onSubmit={post}>
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
