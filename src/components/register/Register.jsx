import useAxios from "../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ValidationError from "../common/FormError";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

  async function registrering(data, e) {
    try {
      const response = await http.post("timeregistreringer", {
        data,
      });
      e.target.reset();
      props.oppdater();
      console.log("timer", response.data);
    } catch (error) {
      console.log("Feil ved registrering av time", error);
      setTimeRegError(<ValidationError>Feil ved registrering av timer</ValidationError>);
    }
  }

  return (
    <>
      <hr />
      <Form onSubmit={handleSubmit(registrering)}>
        {timeRegError && <ValidationError>{timeRegError}</ValidationError>}
        <Form.Group>
          <Form.Label htmlFor="time">Timer jobbet</Form.Label>
          <Form.Control type="text" id="time" {...register("timer")} />
          {errors.timer && (
            <ValidationError>
              <p>Bruk kun hele tall: f.eks 7</p>
            </ValidationError>
          )}
          <Form.Text className="text-muted">Legg inn timer i hele timer f.eks 8 </Form.Text>
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor="kommentar">Kommentar </Form.Label>
        <Form.Control as="textarea" id="kommentar" {...register("kommentar")} />
        <Form.Text className="text-muted">Kommentar til registreringen `Valgfritt`</Form.Text>
</Form.Group>
        <br />
        <Button type="submit" className="cta">
          Registrer
        </Button>
      </Form>
      <br />
    </>
  );
}
