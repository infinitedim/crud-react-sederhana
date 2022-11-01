/* eslint-disable prettier/prettier */
import { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { url } from "../App";

export default function Form({ postCallback, selectedId, clearSelectedId }) {
  const [judul, setJudul] = useState("");
  const [penyanyi, setPenyanyi] = useState("");
  const [musik, setMusik] = useState(null);
  const [musikTemp, setMusikTemp] = useState(null);

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

  /**
   * Fungsi untuk
   */
  function clearState() {
    setJudul("");
    setPenyanyi("");
    setMusik(null);
    setMusikTemp(null);
  }

  /**
   * Fungsi untuk mendapatkan file audio dan mengubahnya dari blob => file agar dapat diupload kembali
   * @param path - audio path
   */
  function getFile(path) {
    fetch(`${url}/${path}`, {
      method: "GET",
    })
      .then((res) => res.blob())
      .then((res) => {
        const fileExt = res.type.split("/")[1] || "ogg";
        const filename =
          path.split("/")[1]?.split("-") ||
          Math.floor(Math.random() * 123123813287);
        filename[0] = null;

        const file = new File(
          [res],
          `${Array.isArray(filename)
            ? filename.filter((str) => str).join("-")
            : `${filename}.${fileExt}`
          }`,
          {
            type: res.type,
          },
        );

        setMusik(file);
      })
      .catch((error) => console.error(error));
  }

  /**
   * Fungsi untuk mendapatkan detail musik
   */
  function getDetail() {
    fetch(`${url}/users/data/${selectedId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        const { data } = res;

        getFile(data.musik || undefined);
        setJudul(data.judul || "");
        setPenyanyi(data.penyanyi || "");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /**
   * Fungsi untuk mengupdate detail musik
   */
  function put(e) {
    e.preventDefault();

    const formData = new FormData();

    if (musikTemp) {
      formData.append("musik", musikTemp);
    } else {
      formData.append("musik", musik);
    }

    formData.append("judul", judul);
    formData.append("penyanyi", penyanyi);

    fetch(`${url}/users/data/${selectedId}`, {
      method: "PUT",
      body: formData,
    })
      .then((res) => {
        if (res.status === 201) {
          Toast.fire({
            icon: "success",
            title: "Song updated successfully!",
          });

          clearState();
          clearSelectedId();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => postCallback());
  }

  /**
   * Fungsi untuk menambahkan musik baru
   */
  function post(e) {
    e.preventDefault();

    const formdata = new FormData(this);

    formdata.append("musik", musik);
    formdata.append("judul", judul);
    formdata.append("penyanyi", penyanyi);

    fetch(`${url}/users/post`, {
      method: "POST",
      mode: "no-cors",
      body: formdata,
    })
      .then(() => {
        clearState();
        postCallback();
        Toast.fire({
          icon: "success",
          title: "Song uploaded!",
        });
      })
      .catch((e) => console.error(e));
  }

  // Otomatis mendapatkan detail ketika selectedId terisi value
  useEffect(() => {
    if (!selectedId) return;

    getDetail();
  }, [selectedId]);

  return (
    <form className="form-post" onSubmit={selectedId ? put : post}>
      <label htmlFor="judul" className="label-judul">
        Judul
        <br />
        <input
          className="input-judul"
          type="text"
          name="judul"
          id="judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />
      </label>

      <label htmlFor="penyanyi" className="label-penyanyi">
        Penyanyi
        <br />
        <input
          className="input-penyanyi"
          type="text"
          name="penyanyi"
          id="penyanyi"
          value={penyanyi}
          onChange={(e) => setPenyanyi(e.target.value)}
        />
      </label>

      <label htmlFor="musik">
        {selectedId ? "Update song" : "Upload song"}
        <br />

        {selectedId && (
          <>
            <small>Current file: {musik?.name ?? ""}</small>
            <br />
          </>
        )}

        <input
          className="input-musik"
          type="file"
          name="musik"
          id="musik"
          onChange={(e) => {
            if (selectedId) {
              setMusikTemp(e.target.files[0] || null);
            } else {
              setMusik(e.target.files[0] || null);
            }
          }}
        />
        <input
          type="submit"
          value={selectedId ? "Update song" : "Upload new Song"}
        />
      </label>


      {selectedId && (
        <button
          type="button"
          onClick={() => {
            clearState();
            clearSelectedId();
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
