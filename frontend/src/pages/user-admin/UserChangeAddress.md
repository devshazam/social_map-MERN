import { FC, useState } from "react";


import { Row } from "react-bootstrap";

import { changeCredencials } from "../../api/userAPI";
import { useSelector, useDispatch } from "react-redux";
import MapChoiceComp from '../ads/create-ad/components/MapChoiceComp'

const UserChangePhone = (props: any) => {
    const dispatch = useDispatch();
    const [createObject, setCreateObject] = useState<any>({address: 'Волгоград, ', district: '4'});
    const [flag, setFlag] = useState<number>(1);

    const stateUser = useSelector((state: any) => state.user.user);
    
    function changeCreateObject(agent1:any){
        setCreateObject({...createObject, ...agent1})
    }

    
        const callChangeCredencials = () => {
            if (!phone) {
                alert("Поле должно быть заполнено!");
                return;
            }
            if (phone.split("").length > 20) {
                alert("Одно из значений более 20 символов!");
                return;
            } // длинну строки

            changeCredencials({phone, userId: stateUser.user.id})
                .then((data: any) => {
                    console.log(data)
                    window.location.replace("/user/private-cab");
                })
                .catch((error: any) => {
                    if (error.response && error.response.data) {
                        alert(
                            `${error.response.data.message}${error.response.status}`
                        );
                    } else {
                        console.log("dev", error);
                        alert("Ошибка 141 - Обратитесь к администратору!");
                    }
                });
        };
        return (
            <>
                <Row className="mb-5">
                <h5>Введите адрес</h5>
                <hr />
                <MapChoiceComp flag={flag}  changeCreateObject={changeCreateObject} createObject={createObject}/>
            </Row>
            </>
        );
    };
    
    export default UserChangePhone;
    