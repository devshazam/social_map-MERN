import React, { useContext, useEffect, useState } from "react";

import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";
import {useDispatch, useSelector} from "react-redux";
import Nav from "react-bootstrap/Nav";
import { Row, Col } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
// import { reciveBasketCount, reciveOrderCount } from "../http/deviceAPI";


const HeaderAbove = () => {
    const [basketNumber, setBasketNumber] = useState("0");
    const [orderNumber, setOrderNumber] = useState("0");

    const dispatch = useDispatch();
    const state = useSelector((state:any) => state.user);
    // const stateAuth = useSelector((state:any) => state.user.isAuth);
console.log(state)
// console.log(stateAuth)
    const showModalLogin = () => {
        dispatch({type: "LOGIN", payload: true})
    };
    const showModalRegistration = () => {
        dispatch({type: "REG", payload: true})
    };
    // const changeUserCred = () => {
    //     helpers.setModalUserCred(true);
    // };

    const logOut = () => {
        dispatch({type: "AUTH", payload: false})
        dispatch({type: "USER", payload: {}})

        localStorage.removeItem("token");
        window.location.reload();
    };


    return (
        <Container>
            <Row>
                <Col xs={12} lg={6}>
                    <h5 className="h-five">Социальный проект города Волгограда!</h5>
                </Col>
                <Col xs={12} lg={6}>
                    <Nav
                        style={{
                            justifyContent: "right",
                            position: "relative",
                            zIndex: 1021,
                        }}
                    >
                        {state.isAuth ? (
                            <>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={state.user.email}
                                >

                                    <NavDropdown.Item onClick={logOut}>
                                        Выход
                                    </NavDropdown.Item>
                                    {state.user.role == "ADMIN" && (
                                        <>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                href="/discounts/create"
                                                className="redLink"
                                            >
                                                Создать скидку
                                            </NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                href="/discounts/create"
                                                className="fioLink"
                                            >
                                                Создать скидку
                                            </NavDropdown.Item>

                                        </>
                                    )}
                                </NavDropdown>
                                <Nav.Item>
                                    <Nav.Link href="/admin/user/private-office">
                                        <Image
                                            src="/files/icons8-thumbs-60.png"
                                            className="bascket_img"
                                            rounded
                                            alt="Рейтинг"
                                            title="Рейтинг"
                                        />
                                        <span className="bascket-num">
                                            {orderNumber}
                                        </span>
                                    </Nav.Link>
                                </Nav.Item>
                                {/*<Nav.Item>*/}
                                {/*    <Nav.Link href="/admin/user/basket">*/}
                                {/*        <Image*/}
                                {/*            src="/file/icons8-basket-50.png"*/}
                                {/*            className="bascket_img"*/}
                                {/*            rounded*/}
                                {/*            alt="Корзина"*/}
                                {/*            title="Корзина"*/}
                                {/*        />*/}
                                {/*        <span className="bascket-num">*/}
                                {/*            {basketNumber}*/}
                                {/*        </span>*/}
                                {/*    </Nav.Link>*/}
                                {/*</Nav.Item>*/}
                            </>
                        ) : (
                            <>
                                <Nav.Item>
                                    <Nav.Link onClick={showModalLogin}>
                                        Вход
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link onClick={showModalRegistration}>
                                        Регистрация
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                        )}
                    </Nav>
                </Col>
            </Row>
        </Container>
    );
};

export default HeaderAbove;


