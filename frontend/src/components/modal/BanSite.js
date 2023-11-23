import React, { useContext, useState, useEffect } from "react";


import { checkIp } from "../../api/discountAPI";
import Image from "react-bootstrap/Image";

const BanSite = () => {

    useEffect(() => {
        checkIp()
            .then((data) => {
            })
            .catch((error) => {
                if (error.response.data) {
                    alert(
                        `${error.response.data.message}${error.response.status}`
                    );
                } else {
                    console.log("dev", error);
                    alert("Ошибка 109 - Обратитесь к администратору!");
                }
            });
    }, []);

    return (
        <>
           
                <div className="ban-modal">
                    <h3>Сайт на обслуживании! +7 (909) 380-25-19</h3>
                    <Image
                        src="/file/b14fa0bc9d533524a1bfadb3c588a843.gif"
                        className="bascket_img"
                        rounded
                        alt="Заказы"
                        title="Заказы"
                    />
                </div>
         
        </>
    );
};

export default BanSite;
