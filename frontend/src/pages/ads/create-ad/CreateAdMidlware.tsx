import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { checkNumbersOfAds } from "../../../api/discountAPI";
import CreateAd from "./CreateAd"

import './CreateAdMidlware.scss';

const CreateDiscount = () => {
    const [number, setNumber] = useState<number>(0);
    const { adCategory } = useParams<string>();
    const stateUser = useSelector((state: any) => state.user.user);
    
console.log(11, 'число объявлений:', number)
    useEffect(() => {
        checkNumbersOfAds({userId: stateUser.id, adCategory})
            .then((data) => {
                setNumber(data)
            })
            .catch((error: any) => {
                if (error.response && error.response.data) {
                    alert(
                        `${error.response.data.message}${error.response.status}`
                    );
                } else {
                    console.log("dev", error);
                    alert("Ошибка 178 - Обратитесь к администратору!");
                }
            });
    }, [])
    

    // ==========================================================================================================

    return (
        <>
            {(number > 4 || stateUser.phone === '0') ?
                <div className="filter-wrap">
                    <p style={{width: '60%', fontSize: '19px', margin: 'auto',}} >К сожалению вы не можете создать объявление по следующей причине: <br />
                    <span className="span-aten">
                        {number > 4 && 'Превышено кол-во объявлений в данной группе'}
                        {stateUser.phone === '0' && 'Вы не указан телефон! (телефон можно указать во вкладке "Редактировать профиль" в верху справа)'}
                        </span>
                    </p>
                    <img src="/files/icons/attention.png" style={{width: '150px', margin: 'auto'}}></img>
                </div>
            :
                <CreateAd />
            }
        </>
    );
};

export default CreateDiscount;
