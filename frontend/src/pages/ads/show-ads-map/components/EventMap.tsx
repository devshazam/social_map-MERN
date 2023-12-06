
import React, { useState,  useRef, useEffect } from "react";

import {Placemark} from "@pbe/react-yandex-maps";

import {fspiralFromSameCoordinatesToYaMap} from '../../../../utils/helpFunctions'


const EventMap = (props: any) => {

    // функция должно окрашивать метки в цвета в зависимости от длительности размещения, если старше 7 дней, то желтый или красный
    let colorPoint = (Math.ceil((new Date().getTime() - props.mainDataObject.item.startDate) / 8.64e7) <= 0) ? 'red' : 'blue';


    return (
        <>
                <Placemark
                        geometry={[props.mainDataObject.item.latitude, props.mainDataObject.item.longitude]}
                        options={{
                            preset: 'islands#oliveStretchyIcon', // список темплейтов на сайте яндекса
                            iconColor: colorPoint, // цвет иконкиz
                            iconOffset: fspiralFromSameCoordinatesToYaMap(props.mainDataObject.arrayCoordinates, props.mainDataObject.index, props.mainDataObject.item), // !!!!!!!!!!!!!!
                        }}
                        properties={{
                            iconContent: `${props.mainDataObject.item.cost}р`, // пару символов помещается
                            hintContent: '<em>кликни меня</em>',
                            balloonContent: `<div class="my-balloon">
                                <h4>${props.mainDataObject.item.name}</h4>
                                <p> Цена: ${props.mainDataObject.item.cost}%</p>
                                <a href="/ad-view/${props.mainDataObject.item._id}">Посмотреть</a>
                                </div>`,
                        }}
                    />

        </>
    );
};

export default EventMap;
