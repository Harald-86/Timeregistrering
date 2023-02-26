import { Link } from "react-router-dom";
import { useContext } from "react";
import Heading from "../common/Heading";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function NavBar() {
  const [auth, setAuth] = useContext(AuthContext);
  const naviger = useNavigate();

  function loggut() {
    setAuth(null);
    naviger("/");
  }

  return (
    <nav>
      {auth ? (
        <>
          <Link to="/minside">
            <Heading size="2" title="Timekontroll" />
          </Link>
          <Button onClick={loggut}>Logg ut</Button>
        </>
      ) : (
        <Link to="/">
          <Heading size="2" title="Timekontroll" />
        </Link>
      )}
    </nav>
  );
}

export default NavBar;
