import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

//Bootstrap
import Container from "react-bootstrap/Container";

//Routes
import Login from "./components/login/Login";
import Regindex from "./components/register/Regindex";

// Components
import NavBar from "./components/nav/Nav";
import Footer from "./components/footer/Footer";

// Style
import "./App.scss";

function App() {
  document.title = "Logg inn | TimeKontroll";
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="wrapper app">
          <Container>
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/minside" element={<Regindex />}></Route>

              {/* <Route path="*" element={<Dashboard />}></Route> */}
              {/*  istead of 404 this redirects to the "dashboard/Feed*/}
            </Routes>
          </Container>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
