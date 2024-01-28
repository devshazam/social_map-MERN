import React from "react";
import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { checkNumbersOfAds } from "../../../api/discountAPI";
import { fetchUserDataById } from "../../../api/userAPI";
import CreateAd from "./CreateAd"
import Spinner from "react-bootstrap/Spinner";

import './CreateAdMidlware.scss';
import globalParamsObject from '../../../parameters/mainAppParameterObject'

const CreateDiscount = () => {
    const [number, setNumber] = useState<number>(-1);
    const [phone, setPhone] = useState<string>('');
    const { adCategory } = useParams<string>();
    const stateUser = useSelector((state: any) => state.user.user);
    const limitArray:number[] = [1, 1, 1, 5];
    
    console.log(adCategory, phone, number)
    useEffect(() => {
        checkNumbersOfAds({userId: stateUser.id, adCategory})
        .then((data) => {
            setNumber(data)
        })
        .catch((error: any) => {
            // серверные ошибки пишутся на стороне сервера
            console.log('dev', error);
        });
    }, [])
    
    
    useEffect(() => {
        fetchUserDataById({userId: stateUser.id})
        .then((data) => {
            setPhone(data.phone)
        })
        .catch((error: any) => {
            // серверные ошибки пишутся на стороне сервера
            console.log('dev', error);
        });
    }, [])
    // TODO - перенести в config
    if(adCategory && !['1', '2', '3', '4', '5'].includes(adCategory)){
        return (<Navigate to="/404" />);
    }
    
    // ==========================================================================================================

    return (
        <>
        {(adCategory && phone && number >= 0) ?

        <>
            {(number >= limitArray[+adCategory - 1] * globalParamsObject.config.adsNumber || phone === '0') ?
                <div className="filter-wrap">
                    <p className="alert-p">Вы не можете создать объявление по следующей причине: <br />
                    <span className="span-aten">
                        {number >= limitArray[+adCategory - 1] * globalParamsObject.config.adsNumber && `Превышено кол-во объявлений в данной группе - ${limitArray[+adCategory - 1] * globalParamsObject.config.adsNumber}`}
                        {phone === '0' && 'Для создания объявления нужно указать номер телефона (телефон можно указать во вкладке "Личный кабинет" в верху справа)'}
                        </span>
                    </p>
                    <img alt="Картинка" src="/files/icons/attention.png" className="alert-img" ></img>
                </div>
            :
                <CreateAd />
            }
        </>
        :
        <div className="spinner_center">
            <Spinner animation="border" />
        </div>
        }
        </>
    );
};

export default CreateDiscount;
