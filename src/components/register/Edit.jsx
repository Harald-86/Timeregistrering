import useAxios from "../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  timer: yup.number().required("Legg inn timer som hele tall"),
  kommentar: yup.string(),
});

export default function RedigerTimer({ id, timer, kommentar, endre, lukk }) {
  const http = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors, successful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function oppdater(data) {
    try {
      const oppdaterRegistrering = await http.put(`timeregistreringer/${id}`, { data });
      console.log("Info på oppdatering  ", oppdaterRegistrering);

      endre();
    } catch (error) {
      console.log("error");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(oppdater)}>
        <label>Timer</label>
        <input type="text" defaultValue={timer} {...register("timer")}></input>
        <label>Kommentar</label>
        <textarea defaultValue={kommentar} {...register("kommentar")} />
        <button type="submit" onClick={lukk}>
          Lagre
        </button>
      </form>
    </>
  );
}
