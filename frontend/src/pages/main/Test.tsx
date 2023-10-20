import React from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'

const Test = () => {
    const defaultState = {
        center: [55.751574, 37.573856],
        zoom: 5,
    };

    return (
        <>
        <div className="col-sm-9" id="contentIdEmpty">
            {/* <h1 > {cash}</h1> */}
            <a href='/'>Перейдите на главную!</a>


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
                        <Placemark
                            geometry={[48.512873, 44.541217]}
                            options={{
                                preset: 'islands#oliveStretchyIcon', // список темплейтов на сайте яндекса
                                iconColor: 'red', // цвет иконки
                            }}
                            properties={{
                                iconContent: 'Сыр', // пару символов помещается
                                hintContent: '<em>кликни меня</em>',
                                balloonContent: `<div class="my-balloon">
                                      <h4>Сырный Дом</h4>
                                      <p>
                                        Скидка 30% на кофе
                                      </p>
                                      <a href="#">Смотреть магазин</a>
                                    </div>`,
                            }}
                        />
                        <Placemark
                            geometry={[48.513834, 44.530113]}
                            options={{
                                preset: 'islands#oliveStretchyIcon', // список темплейтов на сайте яндекса
                                iconColor: 'yellow', // цвет иконки
                            }}
                            properties={{
                                iconContent: 'Kopi34', // пару символов помещается
                                hintContent: '<em>кликни меня</em>',
                                balloonContent: `<div class="my-balloon">
                                      <h4>Полиграфия</h4>
                                      <p>
                                        Скидка 10%
                                      </p>
                                      <a href="#">Смотреть магазин</a>
                                    </div>`,
                            }}
                        />
                    </Map>
                </section>
            </YMaps>

          </div>
        </>
    );
};

export default Test;