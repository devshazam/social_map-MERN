import { useState } from "react";
import isEmail from "validator/lib/isEmail";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { registration } from "../../api/userAPI";

const RegPage = (props:any) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState(""); 

    const makeReg = async () => {
        if (!email || !password || !phone || !name) {
            alert("Оба поля должны быть заполнены!");
            return;
        }
        if (
            email.split("").length > 200 ||
            password.split("").length > 200 ||
            phone.split("").length > 200 ||
            name.split("").length > 200
        ) {
            alert("Одно из значений более 200 символов!");
            return;
        } // длинну строки
        if (!isEmail(email)) {
            alert("Email не корректен!");
            return;
        }

        registration(email, password, name, phone, props.role)
            .then((data) => {
                window.location.replace("/")
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    alert(
                        `${error.response.data.message}${error.response.status}`
                    );
                } else {
                    console.log("dev", error);
                    alert("Ошибка 112 - Обратитесь к администратору!");
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
                    <Form.Label>Имя:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Иванов Иван Иванович"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </Form.Group>
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
                    <Form.Label>Телефон для связи:</Form.Label>
                    <Form.Control
                        type="tel"
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (999) 123-45-67"
                        value={phone}
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
                        placeholder="password"
                        value={password}
                    />
                </Form.Group>
                <Button variant="primary" onClick={makeReg}>
                    Регистрация
                </Button>
            </Form>
        </>
    );
};

export default RegPage;
