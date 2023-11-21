
import React, { useState,  useRef, useEffect } from "react";

import {Placemark} from "@pbe/react-yandex-maps";



const AllDiscountsMap = (props: any) => {

console.log(props.discountItem.latitude, props.discountItem.longitude, 555)
        const currentTime = new Date().getTime();
        let colorPoint;
        if(Math.ceil((currentTime - props.discountItem.currentTime) / 8.64e7) <= 7){
            colorPoint = 'red'
        }else{
            colorPoint = 'yellow'
        }

    return (
        <>
            
                                                    
                                                

      
                <Placemark key={props.discountItem._id}
                        geometry={[props.discountItem.latitude, props.discountItem.longitude]}
                        options={{
                            preset: 'islands#oliveStretchyIcon', // список темплейтов на сайте яндекса
                            iconColor: colorPoint, // цвет иконки
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
