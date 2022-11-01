import { useState } from "react";
import { createPortal } from "react-dom";
import Swal from "sweetalert2";
import { url } from "../App";
import Form from "./Form";

export default function Card(props) {
  const [selectedId, setId] = useState("");

  const Portal = ({ children }) =>
    createPortal(children, document.getElementById("card-popup"));

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

  function delId(id) {
    fetch(`${url}/users/data/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 202 || res.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Song Deleted",
          });

          // refetch ulang datanya ketika berhasil dihapus
          props.callback();
        }
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: err?.message ?? "Error",
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
        <button type="button" onClick={() => setId(props._id)}>
          Edit
        </button>
        <button type="button" onClick={() => delId(props._id)}>
          Delete
        </button>
      </div>

      <Portal>
        {/* Tinggal dibikin popup aja ya */}
        {selectedId && (
          <div className="popup">
            <Form
              className="form-popup"
              postCallback={props.callback}
              selectedId={selectedId}
              clearSelectedId={() => setId("")}
            />
          </div>
        )}
      </Portal>
    </div>
  );
}
