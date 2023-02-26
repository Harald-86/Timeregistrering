import Heading from "../common/Heading";
import MineTimer from "./Hours";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Regindex() {
  return (
    <Container>
      <Row>
        <Heading size="1" title="Timeregistrering" />
        <Col>
          <MineTimer />
        </Col>
      </Row>
    </Container>
  );
}
