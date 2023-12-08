import { FC, useEffect, useState } from "react";
import {Helmet} from "react-helmet";
// import {  useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from "react-bootstrap/Spinner";

import { useSelector } from "react-redux";
import { logReg } from "../../api/userAPI";

import LoginPage from '../../components/modal/LoginPage'
import RegPage from '../../components/modal/RegPage'


const LoginReg: FC = () => {
    const [loading, setLoading] = useState(true);

    const [flag, setFlag] = useState<number>(0);
    const [role, setRole] = useState("USER"); 
    const stateUser = useSelector((state: any) => state.user.isAuth);
    // const navigate = useNavigate();
console.log(flag)
    useEffect(() => {
        if(flag === 1) setLoading(false)
        if(flag === 15) return
        if(!sessionStorage.socialLoginObject){
            console.log(sessionStorage.socialLoginObject, 222)
            setTimeout(function() {setFlag(flag + 1); }, 1000); 
            return
        }
        console.log(sessionStorage.socialLoginObject, 333)

            logReg(JSON.parse(sessionStorage.socialLoginObject))
                    .then((data: any) => {
                        // alert("Успешный Вход в систему!");
                        // helpers.setModalLogin(false);
                        // user.setIsAuth(true);
                        // window.location.reload();
                        // navigate("/", { replace: true });
                        window.location.replace("/")
                    })
                    .catch((error: any) => {
                        if (error.response && error.response.data) {
                            alert(
                                `${error.response.data.message}${error.response.status}`
                            );
                        } else {
                            console.log("dev", error);
                            alert("Ошибка 111 - Обратитесь к администратору!");
                        }
                    });
        
    }, [flag]);
  


    return (
        <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>My Title</title>
                    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossOrigin="anonymous"></script>
                    <script src="//ulogin.ru/js/ulogin.js"></script>
                    <script src="/files/javascript/main.js"></script>
                </Helmet>



        {loading
            ?
            <div id="mail-spinner">
                <Spinner animation="border" />
            </div>
            :

                <Modal show={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Вход и регистрация</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Tabs
                        defaultActiveKey="login"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        >
                        <Tab eventKey="login" title="Вход">
                            <LoginPage />
                        </Tab>
                        <Tab eventKey="reg" title="Регистрация">
                            <Form>
                                <Form.Group
                                // as={Col}
                                // md="12"
                                controlId="validationCustomUsername"
                                className="mb-3"
                                >
                                    <Form.Label>Персона / Компания:</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example"
                                        onChange={(e) => setRole(e.target.value)}
                                        value={role}
                                    >
                                        <option value="USER">Персона</option>
                                        <option value="COMPANY">Компания</option>
                                    </Form.Select>
                                </Form.Group>

                                <RegPage role={role}/>
                            </Form>
                        </Tab>
                        {/* <Tab eventKey="company" title="Регистрация компаний" >
                            Tab content for Contact
                        </Tab> */}
                    </Tabs>
                        {/* <div style={{margin: 'auto', marginTop: '10px', textAlign: 'center'}} id="uLogin_30465678" data-uloginid="30465678"></div> */}
                        { role === "USER" &&
                        <div style={{margin: 'auto', marginTop: '20px', textAlign: 'center'}} id="uLogin30465678" data-ulogin="display=panel;fields=first_name,email;optional=phone,last_name,photo,bdate;lang=ru;providers=vkontakte,yandex,odnoklassniki,google,mailru,youtube;redirect_uri=http%3A%2F%2Fwww.davse.ru%2Flogin-registration;callback=preview"></div>
                        }
                    </Modal.Body>
                </Modal>

            }
        </>
    );
};

export default LoginReg;

