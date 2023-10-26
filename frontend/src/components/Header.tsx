import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import Accordion from 'react-bootstrap/Accordion';


const Header = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary mb-3" sticky="top">
                <Container>
                    {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}

                    <Navbar.Brand href="/">
                        <img
                            src="/files/logo.png"
                            width="200"
                            height="46"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                            id="logo-file"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
                    <Navbar.Offcanvas
                        id="offcanvasNavbar-expand-lg"
                        aria-labelledby="offcanvasNavbarLabel-expand-lg"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                                Offcanvas
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="justify-content-between">
                            <Nav className="justify-content-end  pe-3 my-2 my-lg-0">
                                <NavDropdown
                                    title="Все скидки"
                                    id="offcanvasNavbarDropdown-expand-lg"
                                >
                                    <NavDropdown.Item href="/discounts/create">
                                        Создать скидку
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/produce/banner">
                                        Услуги
                                    </NavDropdown.Item>
                                    {/* <NavDropdown.Item href="/produce/samokleyka">
                                        Самоклейки
                                    </NavDropdown.Item> */}
                                    {/* <NavDropdown.Divider /> */}
                                </NavDropdown>

                                <NavDropdown
                                    title="Доска объявлений"
                                    id="offcanvasNavbarDropdown-expand-lg"
                                >
                                   <NavDropdown.Item href="/goods/futbolki">
                                        Продажа вещей
                                    </NavDropdown.Item>
                                     <NavDropdown.Item href="/goods/krujki">
                                        Услуги
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown
                                    title="Благотворительность"
                                    id="offcanvasNavbarDropdown-expand-lg"
                                >
                                    <NavDropdown.Item href="/prices/vizits-price">
                                        Вещи
                                    </NavDropdown.Item>
                                    <Accordion defaultActiveKey="0" className="menu-accordion">
                                        <Accordion.Item eventKey="1" className="item-accordion">
                                            <Accordion.Header>Еда</Accordion.Header>
                                            <Accordion.Body>
                                                <NavDropdown.Item href="/prices/1">
                                                    Консервы
                                                </NavDropdown.Item>
                                    
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    
                                </NavDropdown>


                                <Nav.Link href="/contacts">Контакты</Nav.Link>
                            </Nav>
                            <Navbar.Text>
                                <span className="label">
                                    г. Волгоград       
                                </span>
                            </Navbar.Text>
                            {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
