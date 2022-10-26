export default function Form() {
  return (
    <form action="">
      <label htmlFor="judul" />
      <input type="text" name="judul" id="judul" />
      <label htmlFor="penyanyi" />
      <input type="text" name="penyanyi" id="penyanyi" />
      <label htmlFor="music" />
      <input type="file" name="music" id="music" />
    </form>
  );
}
