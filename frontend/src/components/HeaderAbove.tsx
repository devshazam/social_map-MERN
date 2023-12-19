
import Container from "react-bootstrap/esm/Container";
import Image from "react-bootstrap/Image";
import {useDispatch, useSelector} from "react-redux";
import Nav from "react-bootstrap/Nav";
import { Row, Col } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

const HeaderAbove = () => {

    const dispatch = useDispatch();
    const stateUser = useSelector((state:any) => state.user);

    const logOut = () => {
        dispatch({type: "AUTH", payload: false})
        dispatch({type: "USER", payload: {}})
        localStorage.removeItem("token");
        delete sessionStorage.socialLoginObject;
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
                        {stateUser.isAuth ? (
                            <>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={stateUser.user.email}
                                >
                                    <NavDropdown.Item onClick={logOut}>
                                        Выход
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/user/user-ads-list">
                                        Мои объявления
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/user/private-cab">
                                        Личный кабинет
                                    </NavDropdown.Item>
                                    
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="/user/ads/create-ad/2">
                                        Создать Благотворительность
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="/user/ads/create-ad/4">
                                        Создать Объявление
                                    </NavDropdown.Item>
                                    {stateUser.user.role == "COMPANY" && (
                                        <>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item
                                                href="/company/ads/create-ad/1"
                                                className="redLink"
                                            >
                                                Создать Cкидку
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                href="/company/ads/create-ad/3"
                                                className="redLink"
                                            >
                                                Создать Мероприятие
                                            </NavDropdown.Item>
                                        </>
                                    )}
                                </NavDropdown>
                                    <Nav.Item>
                                        <Nav.Link href="#">
                                            <Image
                                                src="/files/icons8-thumbs-60.png"
                                                className="bascket_img"
                                                rounded
                                                alt="Рейтинг"
                                                title="Рейтинг"
                                            />
                                            <span className="bascket-num">
                                                {stateUser.user.score || 0}
                                            </span>
                                        </Nav.Link>
                                    </Nav.Item>
                            </>
                        ) : (
                            <>
                                <Nav.Item>
                                    <Nav.Link href="/login-registration">
                                        Вход / Регистрация
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


