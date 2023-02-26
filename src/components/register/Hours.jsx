import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import RegistrerTimer from "./Register";
import SlettTimer from "./Delete";
import RedigerTimer from "./Edit";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment/moment";

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
          <p className="timer--ok">Antall timer registrert: {jobbet}</p>
        </div>
      );
    } else {
      return (
        <div>
          <p className="timer--warning">
            Timer registrert :<span> {jobbet}</span>
          </p>
          <p className="timer--info">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod"</p>
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
    } catch (error) {
      console.log("error");
    }
  }

  return (
    <>
      <Row>
        <Col sm={6}>
          <RegistrerTimer oppdater={hentTimer} />
          <div className="totalsum">
            <p>{summerTimer()} </p>
          </div>
        </Col>
        <Col sm={6}>
          {timer.length === 0 ? (
            <div className="melding">
              <p>Du har ingen registrerte timer</p>
            </div>
          ) : (
            <div className="timeliste">
              {timer.map(function (liste) {
                return (
                  <ul>
                    <li>
                      <p>Dato: {moment(liste.attributes.createdAt).format("DD MMM")}</p>
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
          )}
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={6}>
          <hr />
          <p>
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum."
          </p>
        </Col>
      </Row>
    </>
  );
}
