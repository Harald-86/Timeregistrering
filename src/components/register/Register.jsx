import useAxios from "../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ValidationError from "../common/FormError";

const schema = yup.object().shape({
  timer: yup.number().required(),
  kommentar: yup.string().max(100),
});

export default function RegistrerTimer(props) {
  const http = useAxios();
  const [timeRegError, setTimeRegError] = useState(null);

  console.log(props);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function registrering(data) {
    try {
      const response = await http.post("timeregistreringer", {
        data,
      });
      props.oppdater();
      console.log(response.data);
    } catch (error) {
      console.log("Feil ved registrering av timer", error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(registrering)}>
        {timeRegError && <ValidationError>{timeRegError}</ValidationError>}
        <label htmlFor="time">Antall timer (kun hele)</label>
        <input type="text" placeholder="f.eks 8" id="time" {...register("timer")} />
        {errors.timer && <ValidationError>{errors.timer.message}</ValidationError>}
        <label htmlFor="kommentar">Kommentar </label>
        <input type="text" placeholder="f.eks 8" id="kommentar" {...register("kommentar")} />

        <button type="submit" className="cta">
          Registrer
        </button>
      </form>
    </>
  );
}
