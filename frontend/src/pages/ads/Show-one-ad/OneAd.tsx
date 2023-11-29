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
                if (error.response.data) {
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
                        <Image src={adsItem.image} id="goods-image" thumbnail style={{...dimensionsToStyleObject(JSON.parse(adsItem.dimensions))}}/>
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
                    {adsItem ? (
                        <ListGroup variant="flush">
                            {Object.keys(adsItem).map((item) => {
                                return (
                                    <>
                                        {item === "name" && 
                                            <ListGroup.Item>
                                                {globalParamsObject.main.namesOfMongoMOdel[item] + ' ' + adsItem[item]}
                                            </ListGroup.Item>
                                        }
                                        {item === "description" && 
                                            <ListGroup.Item>
                                                {globalParamsObject.main.namesOfMongoMOdel[item]+ ' ' + adsItem[item]}
                                            </ListGroup.Item>
                                        }
                                        {item === "cost" && 
                                            <ListGroup.Item>
                                                {globalParamsObject.main.namesOfMongoMOdel[item] + ' ' + adsItem[item]}
                                            </ListGroup.Item>
                                        }
                                        {item === "discount" && 
                                            <ListGroup.Item>
                                                {globalParamsObject.main.namesOfMongoMOdel[item] + ' ' + adsItem[item]}%
                                            </ListGroup.Item>
                                        }
                                        {item === "discountCategory" && 
                                            <ListGroup.Item>
                                                {globalParamsObject.main.namesOfMongoMOdel[item] + ' ' + globalParamsObject.discounts.discountsCategory[adsItem[item] - 1]}
                                            </ListGroup.Item>
                                        }
                                        {item === "district" && 
                                            <ListGroup.Item>
                                                {globalParamsObject.main.namesOfMongoMOdel[item] + ' ' + globalParamsObject.main.districtsNames[adsItem[item] - 1]}
                                            </ListGroup.Item>
                                        }
                                        {item === "uniquePart" && 
                                            <>
                                                {Object.values(JSON.parse(adsItem[item])).map((item3: any,index3: any) => {
                                                        return (
                                                            <ListGroup.Item>
                                                                {item3[0]+ ' ' +item3[1]}
                                                            </ListGroup.Item>
                                                        );
                                                    }
                                                )}
                                            </>
                                        }

                                        {item === "userId" && 
                                            <>
                                                <ListGroup.Item>
                                                    <b>Имя продавца (компании): </b>{adsItem[item].name}
                                                </ListGroup.Item>
                                                {stateUser ? 
                                                    <ListGroup.Item>
                                                        <b>Телефон: </b>{adsItem[item].phone}
                                                    </ListGroup.Item>
                                                    : 
                                                    <ListGroup.Item>
                                                        Телефон только
                                                        для
                                                        зарегистрированных
                                                        пользователей!
                                                    </ListGroup.Item>
                                                }
                                            </>
                                        }
                            </>
                            );
                        })}
                        </ListGroup>
                    ) : (
                        <Spinner animation="border" />
                    )}
                </Col>
            </Row>
        </>
    );
};

export default AdView;
