import React, { useContext, useState, useEffect } from "react";


import { checkIp } from "../../api/discountAPI";
import Image from "react-bootstrap/Image";

const BanSite = () => {


    useEffect(() => {
        checkIp()
            .then((data) => {
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    console.log(`${error.response.data.message} ${error.response.status}`);
                } else {
                    console.log("dev", error);
                }
            });
    }, []);


    return (
        <>
        {banFlag && 
                <div className="ban-modal">
                    <h3>Ваш IP не из Волгограда (Волгоградсктй обл.)</h3>
                    <p>Данный сайт создаля для волгоградцев! Пожалуйста подтвердите, что вы из Волгограда или Волгоградской области!</p>
                    <Image
                        src="/file/b14fa0bc9d533524a1bfadb3c588a843.gif"
                        className="bascket_img"
                        rounded
                        alt="Заказы"
                        title="Заказы"
                    />
                </div>
        }
        </>
    );
};

export default BanSite;
