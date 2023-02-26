import useAxios from "../hooks/useAxios";
import Heading from "../common/Heading";
import { BASE_URL } from "../../constants/api";
import { useEffect, useState } from "react";

export default function TotaleTimer(props) {
  console.log("totalTimeProps", props);

  const [timeObjekt, setTimeObjekt] = useState(props);
  console.log("timeObjektet", timeObjekt);

  /*   const http = useAxios();
  const URL = BASE_URL + "timeregistreringer";
  const [timeObjekt, setTimeObjekt] = useState([]);

  const finnTimer = timeObjekt.map((alleTimer) => {
    return alleTimer.attributes.timer;
  });

  console.log("map av finnTimer", finnTimer);

  useEffect(() => {
    addisjon();
    jadda();
  }, []);
  function jadda() {
    const totalen = finnTimer.reduce((verdi1, verdi2) => verdi1 + verdi2, 0);

    return <p>totaaaaal: {totalen}</p>;
  }

  async function addisjon() {
    try {
      const response = await http.get(URL);
      console.log(response.data.data);
      setTimeObjekt(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Heading size="3" title="totale timer" />
      <p>{jadda()}</p>
    </div>
  ); */
}
