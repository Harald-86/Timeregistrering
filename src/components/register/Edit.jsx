import useAxios from "../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import ValidationError from "../common/FormError";

const schema = yup.object().shape({
  timer: yup.number().required("Legg inn timer som hele tall"),
  kommentar: yup.string(),
});

export default function RedigerTimer({ id, timer, kommentar, endre, lukk }) {
  const [editError, setEditError] = useState(null);
  const http = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function oppdater(data) {
    try {
      const oppdaterRegistrering = await http.put(`timeregistreringer/${id}`, { data });
      console.log("Info på oppdatering  ", oppdaterRegistrering);

      endre();
    } catch (error) {
      console.log("Feil ved endring: ", error);
      setEditError(<ValidationError>Feil ved endring</ValidationError>);
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(oppdater)}>
        <Form.Group>
          <Form.Label>Timer</Form.Label>
          <Form.Control type="number" defaultValue={timer} {...register("timer")} />
          {errors.timer && (
            <ValidationError>
              <p>Registrer timer med hele tall</p>
            </ValidationError>
          )}
          <Form.Text className="text-muted">Endre timer</Form.Text>
        </Form.Group>
        <hr />
        <Form.Group>
          <Form.Label>Kommentar</Form.Label>
          <Form.Control as="textarea" defaultValue={kommentar} {...register("kommentar")} />
          {errors.kommentar && <ValidationError>{editError}</ValidationError>}
          <Form.Text>Endre kommentar</Form.Text>
        </Form.Group>
        <br />
        <Button type="submit" onClick={lukk}>
          Lagre
        </Button>
      </Form>
    </>
  );
}
