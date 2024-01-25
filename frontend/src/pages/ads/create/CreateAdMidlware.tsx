import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { checkNumbersOfAds } from "../../../api/discountAPI";
import { fetchUserDataById } from "../../../api/userAPI";
import CreateAd from "./CreateAd"
import Spinner from "react-bootstrap/Spinner";

import './CreateAdMidlware.scss';
import globalParamsObject from '../../../parameters/mainAppParameterObject'

const CreateDiscount = () => {
    const [number, setNumber] = useState<number | null>(null);
    const [phone, setPhone] = useState<string>('');
    const { adCategory } = useParams<string>();
    const stateUser = useSelector((state: any) => state.user.user);
    const limitArray:number[] = [1, 1, 1, 5];

    useEffect(() => {
        checkNumbersOfAds({userId: stateUser.id, adCategory})
            .then((data) => {
                setNumber(data)
            })
            .catch((error: any) => {
                // серверные ошибки пишутся на стороне сервера
            });
    }, [])

    useEffect(() => {
        fetchUserDataById({userId: stateUser.id})
            .then((data) => {
                setPhone(data.phone)
            })
            .catch((error: any) => {
                // серверные ошибки пишутся на стороне сервера
            });
    }, [])
    

    // ==========================================================================================================

    return (
        <>
        {(adCategory && phone && number) ?

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
