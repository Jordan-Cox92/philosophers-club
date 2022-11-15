import { Link, useNavigate } from "react-router-dom"
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap'
import "./NavBar.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <div className="Navstuff">
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Container>
                    <Navbar.Brand href="#home"></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/home"} > Home</Nav.Link>
                            <Nav.Link as={Link} to={"/philosophers"}>Philosophers</Nav.Link>
                            <Nav.Link as={Link} to={"/favoritephilosophers"}>Your Favorite Philosophers </Nav.Link>
                            <Nav.Link as={Link} to={"/epistemology"}>Epistemology </Nav.Link>
                            <Nav.Link as={Link} to={"/metaphysics"}>Metaphysics </Nav.Link>
                            <Nav.Link as={Link} to={"/ethics"}>Ethics </Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
                {
                    localStorage.getItem("philosophy_user")
                        ? <li className="navbar__item navbar__logout">
                            <Nav.Link as={Link} to="" onClick={() => {
                                localStorage.removeItem("philosophy_user")
                                navigate("/", { replace: true })
                            }}>Logout</Nav.Link>
                        </li>
                        : ""
                }
            </Navbar>


        </div >
    )
}