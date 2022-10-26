export default function Card(props) {
  return (
    <div className="card">
      <h1 className="judul">{props.judul}</h1>
      <h2 className="penyanyi">{props.penyanyi}</h2>
      <audio controls>
        <source src={props.musik} type="audio/mp3" />
        <source src={props.musik} type="audio/ogg" />
      </audio>
    </div>
  );
}
