import React, { useState }from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import {TextField} from "@mui/material";

const CreateDiscount = () => {
    const [orderNumber, setOrderNumber] = useState([]);

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
                               margin="normal"  sx={{ width: { sm: 'none', md: '75%' }}} helperText="Название улицы и слово улица (проспект) полностью!"
                    /><TextField id="outlined-basic" label="ПРИМЕР: 29Б" variant="outlined" fullWidth
                               margin="normal"  sx={{ width: { sm: 'none', md: '75%' }}}
                    />


                </Col>


            </Row>
        </>
    );
};

export default CreateDiscount;