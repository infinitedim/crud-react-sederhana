import { useState } from "react";

export default function Navbar() {
  const [id, setId] = useState([]);

  const url = `https://musik98.herokuapp.com/users/data/${id}`;

  function getId() {
    const formdata = new FormData(this);
    formdata.append("id", id);

    fetch(`${url}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((e) => console.error(e));
  }

  return (
    <nav>
      <h1>Spotfoto</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getId();
        }}
      >
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => setId(e.target.value)}
        />
        <input type="submit" value="cari id" />
      </form>
    </nav>
  );
}
