import React from "react";

import {Placemark} from "@pbe/react-yandex-maps";

import {fspiralFromSameCoordinatesToYaMap} from '../../../../utils/helpFunctions'
import globalParamsObject from '../../../../parameters/mainAppParameterObject'


const DiscountsMapComp = (props: any) => {

    // функция должно окрашивать метки в цвета в зависимости от длительности размещения, если старше 7 дней, то желтый или красный
    let colorPoint;
    let colorPointAgent = Math.ceil((new Date().getTime() - props.mainDataObject.item.currentTime) / 8.64e7)
    if(colorPointAgent <= 7) colorPoint = 'red';
    if(colorPointAgent > 7 && colorPointAgent <= 30) colorPoint = 'yellow';
    if(colorPointAgent > 30) colorPoint = 'blue';

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
                            iconContent: `${globalParamsObject.discounts.discountSize[+props.mainDataObject.item.discount - 1]}%`, // пару символов помещается
                            hintContent: '<em>кликни меня</em>',
                            balloonContent: `<div class="my-balloon">
                                <h4>${props.mainDataObject.item.name}</h4>
                                <p>
                                    Скидка ${globalParamsObject.discounts.discountSize[+props.mainDataObject.item.discount - 1]}%
                                </p>
                                <a href="/ad-view/${props.mainDataObject.item._id}">Посмотреть</a>
                                </div>`,
                        }}
                    />

        </>
    );
};

export default DiscountsMapComp;
