import { Link } from "react-router-dom";
import { useContext } from "react";
import Heading from "../common/Heading";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [auth, setAuth] = useContext(AuthContext);
  const naviger = useNavigate();

  function loggut() {
    setAuth(null);
    naviger("/");
  }

  return (
    <nav>
      <div className="brand">
        {auth ? (
          <>
            <Link to="/minside">
              <Heading size="2" title="Timekontroll" />
            </Link>
            <button onClick={loggut}>Logg ut</button>
          </>
        ) : (
          <Link to="/">
            <Heading size="2" title="Timekontroll" />
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
