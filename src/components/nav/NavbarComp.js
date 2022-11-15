// import React, { Component } from 'react'
// import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap'
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     Outlet,
//     Routes
// } from "react-router-dom";
// import { FavoritePhilosophers } from '../philosophers/FavoritePhilosophers';
// import { PhilosopherList } from '../philosophers/PhilosopherList';

// export default class NavbarComp extends Component {
//     render() {
//         return (
//             <Router>
//                 <div>
//                     <Navbar bg="dark" variant={"dark"} expand="lg">
//                         <Container>
//                             <Navbar.Brand href="#home"></Navbar.Brand>
//                             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                             <Navbar.Collapse id="basic-navbar-nav">
//                                 <Nav className="me-auto">
//                                     <Nav.Link as={Link} to={"/home"} > Home</Nav.Link>
//                                     <Nav.Link as={Link} to={"/philosophers"}>Philosophers</Nav.Link>
//                                     <Nav.Link as={Link} to={"/favoritephilosophers"}>Your Favorite Philosophers </Nav.Link>

//                                 </Nav>
//                             </Navbar.Collapse>
//                         </Container>
//                     </Navbar>
//                 </div>
//                 <div>

//                     <Route path="/philosophers">
//                         <PhilosopherList />
//                     </Route>
//                     <Route path="/favoritephilosophers">
//                         <FavoritePhilosophers />
//                     </Route>
//                     <Route path="/">
//                         <Outlet />
//                     </Route>

//                 </div>
//             </Router >
//         )
//     }
// }