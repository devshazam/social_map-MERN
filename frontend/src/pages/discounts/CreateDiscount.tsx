import React, { useState }from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import {TextField} from "@mui/material";

const CreateDiscount = () => {
    const [orderNumber, setOrderNumber] = useState([]);
    const [addressString, setAddressString] = useState('');

    return (
        <>
            <Row className="mb-3">

                <Col xs={12} md={{ span: 6, order: 2 }}>
            <YMaps>
                <section className="map container">
                    <Map
                        state={{
                            center: [48.512741, 44.535905], // координаты центра карты 48.512741, 44.535905
                            zoom: 15,
                        }}
                        width="100%"
                        height={300}
                        // включаем модули, отвечающие за всплывающие окна над геообъектами
                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    >
                        {/* Рисуем метку */}
                        <Placemark
                            geometry={[48.512741, 44.535905]}
                            options={{
                                preset: 'islands#oliveStretchyIcon', // список темплейтов на сайте яндекса
                                iconColor: 'green', // цвет иконки
                            }}
                            properties={{
                                iconContent: 'Кофе', // пару символов помещается
                                hintContent: '<em>кликни меня</em>',
                                balloonContent: `<div class="my-balloon">
                                      <h4>КофеМаг</h4>
                                      <p>
                                        Скидка 50% на кофе
                                      </p>
                                      <a href="#">Смотреть магазин</a>
                                    </div>`,
                            }}
                        />


                    </Map>
                </section>
            </YMaps>
                </Col>


                <Col xs={12} md={{ span: 6, order: 1 }}>
                    <h3>Адрес: г. Волгоград,</h3>
                    <TextField id="outlined-basic" label="ПРИМЕР: проспект Энгельса" variant="outlined" fullWidth
                               margin="normal" helperText="Название улицы и слово улица (проспект) полностью!"
                               type="text"
                               onChange={(e) => setPassword(e.target.value)}
                               value={password}
                    />
                    {/*<TextField id="outlined-basic" label="Название акции/скидки:" variant="outlined" fullWidth />*/}


                </Col>


            </Row>
        </>
    );
};

export default CreateDiscount;


// name: {  type: String, required: true },
// description: {  type: String, required: true },
// cost: { type: String, required: true },
// cost_old: { type: String, required: true },
// discount: { type: Number, required: true },
// address: { type: String, required: true },
// coordinates: { type: [String], required: true },
// image: { type: String, required: true },
// category: { type: String, required: true },