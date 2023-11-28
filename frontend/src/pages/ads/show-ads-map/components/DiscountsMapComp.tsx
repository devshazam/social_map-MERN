
import React, { useState,  useRef, useEffect } from "react";

import {Placemark} from "@pbe/react-yandex-maps";



const AllDiscountsMap = (props: any) => {

    // const arrayRadius: any = [[0, 0], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1]];
    const arrayRadius: any = [[0, 0], [1, -1], [-1, -1], [-1, 1], [1, 1]];

    let midOne = props.arrayCoordinates.reduce((total:any, item:any, index:any) => {if(index >= props.index) return total;
            if(item[0] === props.discountItem.latitude && item[1] === props.discountItem.longitude) {return total + 1 } else{return total}}, 0)
let w: any;
            if(midOne <= 4){

                w = [arrayRadius[midOne][0] * 27, arrayRadius[midOne][1] * 27]
            }else{
                w = [arrayRadius[midOne%8][0] * Math.abs(midOne/8) * 27, arrayRadius[midOne%8][0] * Math.abs(midOne/8) * 27];

            }


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
                            iconOffset: w, // !!!!!!!!!!!!!!
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
