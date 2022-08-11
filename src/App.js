import { Container, Col, Row, Nav, Navbar, Button } from "react-bootstrap";

import Cookies from "universal-cookie";
import Register from "./pages/register";
import Login from "./pages/login";
import { Routes, Route, BrowserRouter, Router } from "react-router-dom";
import Account from "./components/account";
import FreeComponent from "./components/freeComponent";
import AuthComponent from "./components/authComponent";
import Home from "./pages/home";
import ProtectedRoutes from "./components/protectedRoutes";


const cookies = new Cookies();
// get token generated on login
const token = cookies.get("TOKEN");
  // logout
  const logout = () => {
    // destroy the cookie
    cookies.remove("TOKEN", { path: "/" });
    // redirect user to the landing page
    window.location.href = "/";
  }
            <Button type="submit" style={{marginLeft: 400, color:"white"}} variant="danger" onClick={() => logout()}>
            Logout
            </Button>

function App() {
  return (

    <Container>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">IronFist</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/free">Information</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
      <Row>
        <Col className="text-center">
          <br />
        </Col>
      </Row>

      {/* create routes here */}
    
        <Routes>
          <Route exact path="/" element={<Account/>} />
          <Route exact path="/free" element={<FreeComponent/>} />
          <Route exact path="/" element={<ProtectedRoutes/>} >
            <Route path="/auth" element={<AuthComponent/>} />
            <Route exact path="/home" element={<Home/>} />
            <Route exact path="/register" element={
              <Col xs={12} sm={12} md={6} lg={6}>
                <Register/>
             </Col>} />
          </Route>
          
        </Routes>
      
    </Container>
  );
}

export default App;

