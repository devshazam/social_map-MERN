
import React, { useState,  useRef, useEffect } from "react";

import {Placemark} from "@pbe/react-yandex-maps";

import {fspiralFromSameCoordinatesToYaMap} from '../../../../utils/helpFunctions'


const CharityMap = (props: any) => {

    // функция должно окрашивать метки в цвета в зависимости от длительности размещения, если старше 7 дней, то желтый или красный
    let colorPoint = (props.mainDataObject.item.userId.role === "USER") ? 'blue' : 'red';


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
                            // iconContent: `${props.mainDataObject.item.cost}`, // пару символов помещается
                            hintContent: '<em>кликни меня</em>',
                            balloonContent: `<div class="my-balloon">
                                <h4>${props.mainDataObject.item.name}</h4>
                                <p>Забирайте бесплатно!</p>
                                <a href="/ad-view/${props.mainDataObject.item._id}">Посмотреть</a>
                                </div>`,
                        }}
                    />

        </>
    );
};

export default CharityMap;
