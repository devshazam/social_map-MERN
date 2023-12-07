import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";

import { useSelector } from "react-redux";
import { fetchAdById } from "../../../api/discountAPI";

import globalParamsObject from '../../../parameters/mainAppParameterObject'
import {dimensionsToStyleObject} from '../../../utils/helpFunctions'


const AdView: FC = () => {
    const { adId } = useParams<{adId?: string}>();

    const stateUser = useSelector((state: any) => state.user.isAuth);
    const [adsItem, setAdsItem] = useState<any>(null);

    useEffect(() => {
        fetchAdById({ adId })
            .then((data: any) => {
                setAdsItem(data);
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
                <Col xs={12} md={6} className="wrap-image">
                    {adsItem ? (
                        <div style={{border: '1px solid black', margin: 'auto', backgroundColor: '#c5c5c5'}}>
                        <Image src={adsItem.image} id="goods-image" thumbnail style={adsItem.dimensions && {...dimensionsToStyleObject(JSON.parse(adsItem.dimensions))}}/>
                        </div>
                    ) : (
                        <Spinner animation="border" />
                    )}
                </Col>
                <Col xs={12} lg={6}>
                    {adsItem && (
                        <h1>
                            {globalParamsObject.main.adsCategory[adsItem.adCategory - 1]}
                        </h1>
                    )}
                    {adsItem ? 
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                Название: {adsItem.name}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Описание: {adsItem.description}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Район: {globalParamsObject.main.districtsNames[adsItem.district - 1]}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Адрес: {adsItem.address}
                            </ListGroup.Item>
                            
                            <ListGroup.Item>
                                Название: {adsItem.name}
                            </ListGroup.Item>
{/* 1 */}
                            { adsItem.cost  && 
                            <ListGroup.Item>
                                Цена: {adsItem.cost}
                            </ListGroup.Item> }
{/* СКИДКИ */}
                            { adsItem.discount  && 
                            <ListGroup.Item>
                                Скидка: {globalParamsObject.discounts.discountSize[adsItem.discount - 1]}
                            </ListGroup.Item> }
                            { adsItem.discountCategory  && 
                            <ListGroup.Item>
                                Категория скидки: {globalParamsObject.discounts.discountsCategory[adsItem.discountCategory - 1]}
                            </ListGroup.Item> }
{/* Мероприятия */}
                            { adsItem.startDate  && 
                                <ListGroup.Item>
                                    Дата начала: {new Date(+adsItem.startDate).toISOString().split('T')[0]}
                                </ListGroup.Item> }
                            { adsItem.endDate  && 
                            <ListGroup.Item>
                                Дата конца: {new Date(+adsItem.endDate).toISOString().split('T')[0]}
                            </ListGroup.Item> }
                        
{/* АВИТО */}
                            { adsItem.avitoCategory  && 
                                <ListGroup.Item>
                                    Категория объявления: {globalParamsObject.avito.avitoCategory[adsItem.avitoCategory - 1]}
                                </ListGroup.Item> }
                            { adsItem.uniquePart && Object.values(JSON.parse(adsItem.uniquePart)).map((item:any, index:any) => {
                                return(
                                    <ListGroup.Item key={index}>
                                        {`${item[0]}: ${item[1]}`}
                                    </ListGroup.Item> 
                                    );
                                })
                            }
                          



                            <ListGroup.Item>
                                <b>Имя продавца (компании): </b>{adsItem.userId.name}
                            </ListGroup.Item>
                            {stateUser ? 
                                <ListGroup.Item>
                                    <b>Телефон: </b>{adsItem.userId.phone}
                                </ListGroup.Item>
                                : 
                                <ListGroup.Item>
                                    Телефон только
                                    для
                                    зарегистрированных
                                    пользователей!
                                </ListGroup.Item>
                            }

                     
                        </ListGroup>
                     : 
                        <Spinner animation="border" />
                    }
                </Col>
            </Row>
        </>
    );
};

export default AdView;
