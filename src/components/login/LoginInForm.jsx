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

    console.log("form data", data);

    try {
      const response = await axios.post(LOGIN_URL, data);
      console.log("response fra logg inn :", response.data);
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {loginError && <ValidationError>{loginError}</ValidationError>}
        <fieldset disabled={submitting}>
          <input name="email" placeholder="Epost" {...register("identifier")} />
          {errors.email && <ValidationError>{errors.email.message}</ValidationError>}
          <input type="password" name="password" placeholder="passord" {...register("password")} />
          {errors.password && <ValidationError>{errors.password.message}</ValidationError>}
          <button type="submit">{submitting ? "Logg inn.." : "Logg inn"}</button>
        </fieldset>
      </form>
    </>
  );
}
