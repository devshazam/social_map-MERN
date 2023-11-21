import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from 'react-bootstrap/ListGroup';

import {useDispatch, useSelector} from "react-redux";
import { fetchAdById } from "../../api/discountAPI";

const AdView = () => {
    const { adId } = useParams();
    const stateUser = useSelector((state:any) => state.user.isAuth);
    const [adsItem, setAdsItem] = useState<any>(null);

    const namesObject : any = { adCategory: 'Категория:', name: 'Название:', description: 'Описание:', cost: 'Цена:', discount: 'Скидка:', discountCategory: 'Категория:', avitoCategory: 'Категория', startDate: 'Дата начала:', endDate: 'Дата конца:', district: 'Район:', address: 'Адрес:'}
    const exceptions : any = [ 'latitude', 'longitude', 'image', 'currentTime', '_id', '__v', 'createdAt', 'updatedAt', 'adCategory'];
    const adCatArr : any = [ 'Скидки', 'Благотворительность', 'Мероприятия', 'Объявления']
    const districtNames: any = ['Ворошиловский',  'Дзержинский', 'Кировский', 'Красноармейский', 'Краснооктябрьский', 'Советский', 'Тракторозаводский', 'Центральный']
    const disCatArray: string[] = ['Красота и здоровье', 'Все для животных', 'Одежда и обувь', 'Товары для детей', 'Автомобиль', 'Электроника', 'Дом и дача', 'Хобби и отдых', 'Продукты', 'Фитнес и спорт']



if(adsItem) console.log(Object.keys(adsItem))
    useEffect(() => {
        fetchAdById({ adId })
            .then((data:any) => {
                setAdsItem(data);
                // console.log("dev", data);
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
                        {adsItem ?
                            <Image
                                src={adsItem.image}
                                id="goods-image"
                                thumbnail
                            />
                        :
                            <Spinner animation="border" />
                        }
                    </Col>
                    <Col xs={12} lg={6}>
                    {adsItem && <h1>{namesObject.adCategory} { adCatArr[adsItem.adCategory - 1]}</h1> }
                    {adsItem ?
                        <ListGroup variant="flush">
                            {Object.keys(adsItem).map((item) =>{
                                    console.log(exceptions.indexOf(item))
                                return (
                                    <>
                                {exceptions.indexOf(item) === -1 &&
                                    <>
                                        {item === 'name' && <ListGroup.Item>{namesObject[item]} {adsItem[item]}</ListGroup.Item>}
                                        {item === 'description' && <ListGroup.Item>{namesObject[item]} {adsItem[item]}</ListGroup.Item>}
                                        {item === 'cost' && <ListGroup.Item>{namesObject[item]} {adsItem[item]}</ListGroup.Item>}
                                        {item === 'discount' && <ListGroup.Item>{namesObject[item]} {adsItem[item]}%</ListGroup.Item>}
                                        {item === 'discountCategory' && <ListGroup.Item>{namesObject[item]} {disCatArray[adsItem[item] - 1]}</ListGroup.Item>}
                                        {/* {item == 'avitoCategory' && <ListGroup.Item>{namesObject[item]} {districtNames[adsItem[item] - 1]}</ListGroup.Item>} */}
                                        {item === 'district' && <ListGroup.Item>{namesObject[item]} {districtNames[adsItem[item] - 1]}</ListGroup.Item>}
                                        {item === 'uniquePart' && 
                                            <>
                                                {
                                                    Object.values(JSON.parse(adsItem[item])).map((item3:any, index3:any ) =>{
                                                        return(
                                                            <ListGroup.Item>{item3[0]} {item3[1]}</ListGroup.Item>
                                                        );
                                                })
                                                }
                                            </>
                                        }
                                        
                                        {item === 'userId' && <>
                                                            
                                                                <ListGroup.Item><b>Имя продавца (компания):</b> {adsItem[item].name}</ListGroup.Item>
                                                                {stateUser ?
                                                                <ListGroup.Item><b>Телефон:</b> {adsItem[item].phone}</ListGroup.Item>
                                                                :
                                                                <ListGroup.Item>Телефон только для зарегистрированных пользователей!</ListGroup.Item>}
                                                            </>
                                        }
                                    </>
                                    
                                }
                                </>);
                            })}
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


