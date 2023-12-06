import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { createDiscount } from "../../../api/discountAPI";

import ImageResizingComp from "./components/ImageResizingComp";
import CommonFieldsComp from "./components/CommonFieldsComp";
import MapChoiceComp from "./components/MapChoiceComp";
import Alert from '@mui/material/Alert';

import Discounts from "./components/unique-components/Discounts";
import Events from "./components/unique-components/Events";
import Avito from "./components/unique-components/Avito";
import globalParamsObject from '../../../parameters/mainAppParameterObject'

// import AlertDialog from "../../../components/AlertDialog"

const CreateDiscount = () => {
    const { adCategory } = useParams<string>();
    const [flag, setFlag] = useState<number>(1);
    const [createObject, setCreateObject] = useState<any>({address: 'Волгоград, ', district: '4'});

    const stateUser = useSelector((state: any) => state.user.user);
    
    function changeCreateObject(agent1:any){
        setCreateObject({...createObject, ...agent1})
    }
    console.log(createObject, 221)
    
    
    let sendToServer = () => {
        if (adCategory && !globalParamsObject.main.arrayAdCategory[+adCategory - 1].every((i:any) => Boolean(createObject[i]))) {
            setFlag(0);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            return;
        }

        const formData = new FormData();
        Object.entries({...createObject, userId: stateUser.id, adCategory}).map((item: any) => {
            formData.append(item[0], item[1]);
        });

        createDiscount(formData)
            .then((data) => {
                console.log(data);
                alert("Ваше объявление добавлено успешно!");
                window.location.reload();
            })
            .catch((error: any) => {
                if (error.response && error.response.data) {
                    alert(
                        `${error.response.data.message}${error.response.status}`
                    );
                } else {
                    console.log("dev", error);
                    alert("Ошибка 138 - Обратитесь к администратору!");
                }
            });
    };

    //

    // ==========================================================================================================

    return (
        <>
        {/* <AlertDialog /> */}
            <Row className="mb-5">
                <h5>
                    Шаг №1: Заполните полный адрес, включая номер и литеру дома.
                </h5>
                <hr />
                <MapChoiceComp flag={flag}  changeCreateObject={changeCreateObject} createObject={createObject}/>
            </Row>
            <Row className="mb-2">
                <h5>Шаг №2: Заполните общие хар-ки</h5>
                <hr />
                <CommonFieldsComp flag={flag}  changeCreateObject={changeCreateObject} createObject={createObject}/>
            </Row>
            <Row className="mb-5">
                {adCategory && (
                    <>
                        {adCategory === "1" && <Discounts flag={flag} changeCreateObject={changeCreateObject} createObject={createObject}/>}
                        {adCategory === "3" && <Events flag={flag}  changeCreateObject={changeCreateObject} createObject={createObject}/>}
                        {adCategory === "4" && <Avito flag={flag}  changeCreateObject={changeCreateObject} createObject={createObject}/>}
                    </>
                )}
            </Row>
            <Row className="mb-5">
                <h5>
                    Шаг №3: Загрузите картинку в формате: jpg,
                    jpeg, png
                </h5>
                <hr />
                <ImageResizingComp flag={flag}  changeCreateObject={changeCreateObject} createObject={createObject}/>
            </Row>
            <Row className="mb-">
                <h5>Шаг №4: Публикация объявление о скидки</h5>
                <hr style={{ marginBottom: "10px" }} />

                <h6>
                    Нажимая на кнопку "Опубликовать" вы принимаете условия
                    предоставления услуги:
                </h6>
                <ol>
                    <li>
                        Срок проведения акции ограничен исключительно фактом
                        публикации акции на сайте, т.е. предоставленное вами
                        объявление действительна в течении всего срока публикации на
                        сайте, для прекращения действия акции вам нужно удалить объявление в личном
                        кабинете!
                    </li>
                    <li>
                        Общие условия предоставления услуги изложенные в
                        договре-оферете по ссылке
                    </li>
                </ol>
                <Button variant="contained" fullWidth onClick={sendToServer}>
                    Опубликовать объявление
                </Button>
            </Row>
        </>
    );
};

export default CreateDiscount;
