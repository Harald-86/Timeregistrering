import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import RegistrerTimer from "./Register";
import SlettTimer from "./Delete";
import RedigerTimer from "./Edit";
import Modal from "react-bootstrap/Modal";

export default function MineTimer() {
  const [timer, setTimer] = useState([]);
  const [summering, setSummering] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const http = useAxios();

  const finnTimer = summering.map((alleTimer) => {
    return alleTimer.attributes.timer;
  });

  function summerTimer() {
    const jobbet = finnTimer.reduce((verdi1, verdi2) => verdi1 + verdi2, 0);
    if (jobbet <= 100) {
      return (
        <div>
          <p className="timer--ok">Timer registrert: {jobbet}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p className="timer--warning">
            Timer registrert:<span> {jobbet}</span>
          </p>
          <p className="timer--info">Antall timer registrert overskrider antall lovlige timer jobbet</p>
        </div>
      );
    }
  }

  useEffect(() => {
    hentTimer();
    summerTimer();
    // eslint-disable-next-line
  }, []);

  async function hentTimer() {
    try {
      const response = await http.get("timeregistreringer");
      setTimer(response.data.data);
      setSummering(response.data.data);
      console.log("api respons: ", response.data.data);
    } catch (error) {
      console.log("error");
    }
  }

  return (
    <>
      <RegistrerTimer oppdater={hentTimer} />
      <div className="timeliste">
        {timer.map(function (liste) {
          return (
            <ul>
              <li>
                <p>Timer jobbet: {liste.attributes.timer}</p>
                <p>Kommentar: {liste.attributes.kommentar}</p>
                <SlettTimer id={liste.id} slett={hentTimer} />
                <button onClick={handleShow}>Rediger</button>
                <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header>
                    <Modal.Title>Rediger time</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <RedigerTimer
                      id={liste.id}
                      timer={liste.attributes.timer}
                      kommentar={liste.attributes.kommentar}
                      endre={hentTimer}
                      lukk={handleClose}
                    />
                  </Modal.Body>
                </Modal>
              </li>
            </ul>
          );
        })}
      </div>
      <div>
        <p>{summerTimer()} </p>
      </div>
    </>
  );
}
