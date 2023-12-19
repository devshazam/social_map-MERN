import { FC, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { changeCredencials } from "../../api/userAPI";
import { useSelector, useDispatch } from "react-redux";


const UserChangePhone = (props: any) => {
    const stateUser = useSelector((state: any) => state.user);
        const [phone, setPhone] = useState<any>(props.phone);
        const dispatch = useDispatch();
    
        const hideModal = () => {
            dispatch({ type: "PHONE", payload: false });
        };
    
        const callChangeCredencials = () => {
            if (!phone) {
                alert("Поле должно быть заполнено!");
                return;
            }
            if (phone.split("").length > 20) {
                alert("Одно из значений более 20 символов!");
                return;
            } // длинну строки

            changeCredencials({phone, userId: stateUser.user.id})
                .then((data: any) => {
                    console.log(data)
                    // if(data.status === 'success'){
                    //     localStorage.setItem('phone', phone)
                    // }
                    window.location.replace("/user/private-cab");
                })
                .catch((error: any) => {
                    if (error.response && error.response.data) {
                        alert(
                            `${error.response.data.message}${error.response.status}`
                        );
                    } else {
                        console.log("dev", error);
                        alert("Ошибка 141 - Обратитесь к администратору!");
                    }
                });
        };
        return (
            <>
                <Modal show={stateUser.phoneModal} onHide={hideModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Введите новые данные:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* <Form.Group className="mb-3">
                                <Form.Label>Введите новый email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </Form.Group> */}
                            <Form.Group className="mb-3">
                                <Form.Label>Введите новый телефон:</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={callChangeCredencials}>
                                Отправить
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        );
    };
    
    export default UserChangePhone;
    