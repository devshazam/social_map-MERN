
import React, { useState,  useRef, useEffect } from "react";

import {Placemark} from "@pbe/react-yandex-maps";



const AllDiscountsMap = (props: any) => {

    // ф-ция которая распределяет метки с одной координатой по спирали
    const arrayRadius: any = [[0, 0], [1, -1], [-1, -1], [-1, 1], [1, 1]];
    let midOne = props.arrayCoordinates.reduce((total:any, item:any, index:any) => {if(index >= props.index) return total;
            if(item[0] === props.discountItem.latitude && item[1] === props.discountItem.longitude) {return total + 1 } else{return total}}, 0)
    let iconOffsetVar = (midOne <= 4) ? [arrayRadius[midOne][0] * 27, arrayRadius[midOne][1] * 27] : [arrayRadius[midOne%8][0] * Math.abs(midOne/8) * 27, arrayRadius[midOne%8][0] * Math.abs(midOne/8) * 27];

    // функция должно окрашивать метки в цвета в зависимости от длительности размещения, если старше 7 дней, то желтый или красный
    let colorPoint = (Math.ceil((new Date().getTime() - props.discountItem.currentTime) / 8.64e7) <= 7) ? 'red' : 'yellow';


    return (
        <>
                <Placemark key={props.discountItem._id}
                        geometry={[props.discountItem.latitude, props.discountItem.longitude]}
                        options={{
                            preset: 'islands#oliveStretchyIcon', // список темплейтов на сайте яндекса
                            iconColor: colorPoint, // цвет иконки
                            iconOffset: iconOffsetVar, // !!!!!!!!!!!!!!
                        }}
                        properties={{
                            iconContent: `${props.discountItem.discount}%`, // пару символов помещается
                            hintContent: '<em>кликни меня</em>',
                            balloonContent: `<div class="my-balloon">
                                <h4>${props.discountItem.name}</h4>
                                <p>
                                    Скидка ${props.discountItem.discount}% на кофе
                                </p>
                                <a href="/ad-view/${props.discountItem._id}">Посмотреть</a>
                                </div>`,
                        }}
                    />

        </>
    );
};

export default AllDiscountsMap;
