import useAxios from "../hooks/useAxios";

export default function SlettTimer({ id, slett }) {
  const http = useAxios();

  async function slettTime() {
    try {
      const fjernet = await http.delete(`timeregistreringer/${id}`);
      console.log("følgende time er slettet", fjernet);
      slett();
    } catch (error) {
      console.log("Feil ved sletting av time");
    }
  }
  return (
    <>
      <button
        onClick={() => {
          if (window.confirm("Vil du slette time?")) slettTime();
        }}
      >
        Slett
      </button>
    </>
  );
}
