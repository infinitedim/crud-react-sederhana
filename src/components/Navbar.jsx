// import { useState, useEffect } from "react";

// export default function Navbar() {
//   const [musics, setMusics] = useState([]);

//   // console.log(musics.length);

//   useEffect(() => {
//     fetch("https://musik98.herokuapp.com/users/data/")
//       .then((res) => res.json())
//       .then((res) => {
//         setMusics(res.data);
//       });
//   }, [setMusics]);

//   function getId() {
//     musics
//   }

//   return (
//     <nav className="navbar">
//       <h1>Spotfoto</h1>
//       <input type="text" className="search" />
//       <button type="submit" onClick={() => getId()}>
//         Cari
//       </button>
//     </nav>
//   );
// }
