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
                                Меню сайта:
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="justify-content-between">
                            <Nav className="justify-content-end  pe-3 my-2 my-lg-0">
                                
                                <Nav.Link href="/ads/1">Скидки города</Nav.Link>
                                <Nav.Link href="/ads/2">Благотворительность</Nav.Link>
                                <Nav.Link href="/ads/3">Мероприятия</Nav.Link>
                                <Nav.Link href="/ads/4">Объявления (новое и б/у)</Nav.Link>
                                {/* <NavDropdown
                                    title="Доска объявлений БУ"
                                    id="offcanvasNavbarDropdown-expand-lg"
                                >
                                    <Accordion defaultActiveKey="0" className="menu-accordion">
                                        <Accordion.Item eventKey="1" className="item-accordion">
                                            <Accordion.Header>Недвижимость</Accordion.Header>
                                            <Accordion.Body>
                                                <NavDropdown.Item href="/ads/4/?avitoCategory=1">
                                                    Посуточная аренда
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href="/ads/4/?avitoCategory=2">
                                                    Длительная аренда
                                                </NavDropdown.Item>
                                                <NavDropdown.Item href="/ads/4/?avitoCategory=3">
                                                    Продажа
                                                </NavDropdown.Item>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                    <NavDropdown.Item href="/ads/4/?avitoCategory=4">
                                        Автотранспорт
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/ads/4/?avitoCategory=5">
                                        Личные вещи
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/ads/4/?avitoCategory=6">
                                        Электроника
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/ads/4/?avitoCategory=7">
                                        Работа
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/ads/4/?avitoCategory=8">
                                        Услуги
                                    </NavDropdown.Item>
                                </NavDropdown> */}
                                {/* <Nav.Link href="/contacts">Карта доверия</Nav.Link> */}
                                <Nav.Link href="/contacts">Контакты</Nav.Link>
                            </Nav>
                            {/* <Navbar.Text>
                                <span className="label">
                                    г. Волгоград       
                                </span>
                            </Navbar.Text> */}
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
