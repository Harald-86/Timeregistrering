import Heading from "../common/Heading";
import MineTimer from "./Hours";
import Container from "react-bootstrap/Container";

export default function Regindex() {
  document.title = "Min side | TimeKontroll";
  return (
    <Container>
      <Heading size="1" title="Timeregistrering" />
      <MineTimer />
    </Container>
  );
}
