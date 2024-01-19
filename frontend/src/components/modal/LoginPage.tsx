import {  useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { login } from "../../api/userAPI";
import {useDispatch} from "react-redux";

const LoginPage = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const makeLogin = () => {
        if (!email || !password) {
            alert("Оба поля должны быть заполнены!");
            return;
        }
        if (email.split("").length > 200 || password.split("").length > 200) {
            alert("Одно из значений более 200 символов!");
            return;
        } 

        login(email, password)
            .then((data: any) => {
                window.location.replace("/")
            })
            .catch((error: any) => {
                // STOP - спровоцировать ошибку
                alert(2)
                dispatch({type: "ALERT", payload: {modal: true, variant: 'warning', text: `${error.response.data.message.u.u}`}});
                if (error.response && error.response.data) {
                } 
            });
    };

    return (
        <>
            <Form>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                >
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </Form.Group>
                <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                >
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Введите пароль"
                    />
                </Form.Group>
                <Button variant="primary" onClick={makeLogin}>
                    Вход
                </Button>
            </Form>
        </>
    );
};

export default LoginPage;

