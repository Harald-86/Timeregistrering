import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL } from "../../constants/api";
import ValidationError from "../common/FormError";
import { useNavigate } from "react-router-dom";
import Heading from "../common/Heading";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LOGIN_URL = BASE_URL + "auth/local";
console.log(BASE_URL);

const schema = yup.object().shape({
  identifier: yup.string().required("Skriv inn din Epostadresse"),
  password: yup.string().required("Skriv inn passord"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  // eslint-disable-next-line
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [auth, setAuth] = useContext(AuthContext);
  const naviger = useNavigate();

  useEffect(() => {
    if (auth) {
      naviger("/minside");
    }
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(LOGIN_URL, data);
      setAuth(response.data);
      naviger("/minside");
    } catch (error) {
      console.log("Error", error);
      setLoginError(<ValidationError>Feil brukernavn og/eller passord</ValidationError>);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login">
      <div className="login__container">
        <Heading size="3" title="Logg inn" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          {loginError && <ValidationError>{loginError}</ValidationError>}
          <fieldset disabled={submitting}>
            <Form.Group>
              <Form.Label>Brukernavn</Form.Label>
              <Form.Control name="email" placeholder="Epost" {...register("identifier")} />
              <Form.Text className="text-muted">Brukernavn eller Epost</Form.Text>
              {errors.email && <ValidationError>{errors.email.message}</ValidationError>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Passord</Form.Label>
              <Form.Control type="password" name="password" placeholder="passord" {...register("password")} />
              <Form.Text className="text-muted">
                Kontakt "hm.tomter@gmail.com" om du mangler brukernavn og passord
              </Form.Text>
              {errors.password && <ValidationError>{errors.password.message}</ValidationError>}
            </Form.Group>
            <br />
            <Button type="submit">{submitting ? "Logger inn.." : "Logg inn"}</Button>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
