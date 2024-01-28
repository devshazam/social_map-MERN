import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";

// import { useSelector } from "react-redux";
import { fetchAdById } from "../../../api/discountAPI";

import globalParamsObject from '../../../parameters/mainAppParameterObject'
// import {dimensionsToStyleObject} from '../../../utils/helpFunctions'
import {useDispatch} from "react-redux";

const AdView: FC = () => {
    const dispatch = useDispatch();
    const { adId } = useParams<{adId?: string}>();
    // const stateUser = useSelector((state: any) => state.user.isAuth);
    const [adsItem, setAdsItem] = useState<any>(null);

    useEffect(() => {
        fetchAdById({ adId })
            .then((data: any) => {
                setAdsItem(data);
            })
            .catch((error) => {
                if(error.response && error.response.data) {
                    dispatch({type: "ALERT", payload: {modal: true, variant: 'warning', text: `${error.response.data.message}`}});
                } 
            });
    }, []);

    return (
        <>
            <Row className="mb-3">
                <Col xs={12} md={6} className="wrap-image">
                    {adsItem ? (
                        <div className="card-user_cab">
                            <div className="back_wrap_new" 
                            // style={{backgroundImage: `url(${adsItem.image})`}}
                            >
                                <img  alt="Место для картинки" src={adsItem.image} className='card_img-user_cab' />
                            </div>
                        </div>
                    ) : (
                        <Spinner animation="border" />
                    )}
                </Col>
                <Col xs={12} lg={6}>
                    {adsItem ? 
                        <>
                            <h1 className={`nav_${globalParamsObject.main.adsCategoryNames[+adsItem.adCategory - 1]}_link`}>
                                {adsItem && globalParamsObject.main.adsCategory[+adsItem.adCategory - 1]}
                            </h1>
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
                                    Цена (руб.): {adsItem.cost}
                                </ListGroup.Item> }
    {/* СКИДКИ */}
                                { adsItem.discount  && 
                                <ListGroup.Item>
                                    Скидка (%): {globalParamsObject.discounts.discountSize[adsItem.discount - 1]}
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
                            { adsItem.avitoSubCategory  && 
                                <ListGroup.Item>
                                    Подкатегория объявления: {globalParamsObject.avito.avitoSubCategory[adsItem.avitoCategory - 1][adsItem.avitoSubCategory - 1]}
                                </ListGroup.Item> }
                            { adsItem.uniquePart && Object.values(JSON.parse(adsItem.uniquePart)).map((item:any, index:any) => {
                                return(
                                    <ListGroup.Item key={index}>
                                        {`${item[0]} ${item[1]}`}
                                    </ListGroup.Item> 
                                    );
                                })
                            }

                                <ListGroup.Item>
                                    <b>Имя продавца (компании): </b>{adsItem.userId.name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <b>Телефон: </b>{adsItem.userId.phone}
                                </ListGroup.Item>

                            </ListGroup>
                        </>
                     : 
                        <Spinner animation="border" />
                    }
                </Col>
            </Row>
        </>
    );
};

export default AdView;
