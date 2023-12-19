import { FC, useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';

import UserChangePhone from './UserChangePhone';

import { fetchUserDataById } from "../../api/userAPI";


const UserUpdateOne: FC = () => {
    const stateUser = useSelector((state: any) => state.user.user);
    const [userData, setUserData] = useState<any>({});
    const dispatch = useDispatch();

    const showModal = () => {
        dispatch({ type: "PHONE", payload: true });
    };

    useEffect(() => {
        fetchUserDataById({ userId: stateUser.id })
            .then((data: any) => {
                setUserData(data);
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    alert(
                        `${error.response.data.message}${error.response.status}`
                    );
                } else {
                    console.log("dev", error);
                    alert("Ошибка 141 - Обратитесь к администратору!");
                }
            });
    }, []);


    return (
        <>
            <Row className="mb-3">
                <Col xs={12} md={6} className="wrap-image d-none d-md-block" >
                        <div style={{border: '1px solid black', margin: 'auto', backgroundColor: '#c5c5c5'}}>
                        <Image src="/files/img/privat.jpg" id="goods-image"/>
                        </div>

                </Col>
                <Col xs={12} lg={6}>
                        <h3>Личные данные:</h3>
                    {Object.keys(userData).length ? (
                        <>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                Роль:  
                                 {userData.role === 'USER' && ' Пользователь'}
                                 {userData.role === 'COMPANY' && ' Компания'}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Имя / Название: {userData.name}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Email: {userData.email}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Телефон: {userData.phone !== '0' ? userData.phone : "Не указан"} - (<Button onClick={showModal}>Изменить телефон</Button>)
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Социальные баллы: <span style={{fontSize: '20px', color: 'red', fontWeight: 400}}>{userData.score}</span> баллов
                            </ListGroup.Item>
                            {/* <p style={{fontSize: '12px'}}>*Соц.</p> */}
                            {/* <ListGroup.Item>
                                Адрес*: {userData.address && userData.address}
                                - (<Button href="/user/user-change-address">Изменить телефон</Button>)
                            </ListGroup.Item>
                            <p style={{fontSize: '12px'}}>*Адрес - если указать номер ближайшего к вам дома, при просмотре объявлений карта будет открываться вокруг этого адреса. Адрес пользователей является приватной информацией, а адрес компаний нужен для размещения их на карте города!</p> */}
  

                        </ListGroup>
                        <UserChangePhone phone={userData.phone} />
                        </>
                    ) : (
                        <Spinner animation="border" />
                    )}
                </Col>
            </Row>

        </>
    );
};

export default UserUpdateOne;
