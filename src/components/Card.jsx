import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { url } from "../App";

export default function Card(props) {
  const [del, setDel] = useState([]);
  const [edit, setEdit] = useState([]);
  const MySwal = withReactContent(Swal);

  function editId() {
    fetch(`${url}/users/data/${edit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      mode: "no-cors",
    })
      .then((res) => res.json())
      .then((res) => {
        setEdit(res);
        console.log(res);
      });
  }

  function delId() {
    const formdata = new FormData(this);

    formdata.append("_id", del);
    fetch(`${url}/users/data/${del}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setDel(res);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Data Deleted",
        });
      });
  }

  return (
    <div className="card">
      <h1 className="judul">{props.judul}</h1>
      <h2 className="penyanyi">{props.penyanyi}</h2>
      <audio controls>
        <source src={props.musik} type="audio/ogg" />
      </audio>
      <div className="button-container">
        <button type="button">Edit</button>
        <button
          type="button"
          onClick={() => {
            setDel(props._id);
            delId();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
