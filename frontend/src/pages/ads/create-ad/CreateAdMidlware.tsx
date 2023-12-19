import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { checkNumbersOfAds } from "../../../api/discountAPI";
import { fetchUserDataById } from "../../../api/userAPI";
import CreateAd from "./CreateAd"

import './CreateAdMidlware.scss';

const CreateDiscount = () => {
    const [number, setNumber] = useState<number>(0);
    const [phone, setPhone] = useState<string>('0');
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

    useEffect(() => {
        fetchUserDataById({userId: stateUser.id})
            .then((data) => {
                setPhone(data.phone)
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
            {(number > 4 || phone === '0') ?
                <div className="filter-wrap">
                    <p style={{width: '60%', fontSize: '19px', margin: 'auto',}} >Вы не можете создать объявление по следующей причине: <br />
                    <span className="span-aten">
                        {number > 4 && 'Превышено кол-во объявлений в данной группе'}
                        {phone === '0' && 'Для создания объявления нужно указать номер телефона (телефон можно указать во вкладке "Личный кабинет" в верху справа)'}
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
