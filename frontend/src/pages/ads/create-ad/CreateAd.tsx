import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { createDiscount } from "../../../api/discountAPI";

import ImageResizingComp from "./components/ImageResizingComp";
import CommonFieldsComp from "./components/CommonFieldsComp";
import MapChoiceComp from "./components/MapChoiceComp";

import Discounts from "./components/unique-components/Discounts";
import Events from "./components/unique-components/Events";
import Avito from "./components/unique-components/Avito";

const CreateDiscount = () => {
    const [flag, setFalg] = useState(1);

    const { adCategory } = useParams<string>();

    const stateUser = useSelector((state: any) => state.user.user);
    // const stateIsAuth = useSelector((state: any) => state.user.isAuth);

    const stateImg = useSelector((state: any) => state.app.img);
    const stateMap = useSelector((state: any) => state.app.map);
    const stateCommon = useSelector((state: any) => state.app.common);
    const stateMain = useSelector((state: any) => state.app.main);
    const stateUnique = useSelector((state: any) => state.app.unique);

    let sendToServer = () => {
        let mainObject = {
            ...stateMap,
            ...stateCommon,
            ...stateMain,
        };
        if (!stateImg || !stateUser || !adCategory ||
            !Object.values(mainObject).every((i:any) => Boolean(i))) {
            setFalg(0);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            return;
        }

        mainObject = {
            userId: stateUser.id,
            adCategory,
            img: stateImg,
            ...mainObject,
            ...stateUnique,
        };

        const formData = new FormData();
        Object.entries(mainObject).map((item: any) => {
            formData.append(item[0], item[1]);
        });

        createDiscount(formData)
            .then((data) => {
                console.log(data);
            })
            .catch((error: any) => {
                if (error.response.data) {
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
            <Row className="mb-5">
                <h5>
                    Шаг №1: Заполните полный адрес, включая номер и литеру дома.
                </h5>
                <hr />
                <MapChoiceComp flag={flag} />
            </Row>
            <Row className="mb-2">
                <h5>Шаг №2: Заполните общие хар-ки</h5>
                <hr />
                <CommonFieldsComp flag={flag} />
            </Row>
            <Row className="mb-5">
                {adCategory && (
                    <>
                        {adCategory === "1" && <Discounts flag={flag} />}

                        {adCategory === "3" && <Events flag={flag} />}
                        {adCategory === "4" && <Avito flag={flag} />}
                    </>
                )}
            </Row>
            <Row className="mb-5">
                <h5>
                    Шаг №3: Загрузите картинку в формате: jpg,
                    jpeg, png
                </h5>
                <hr />
                <ImageResizingComp flag={flag} />
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
                        публикации акции на сайте, т.е. предоставленная вами
                        акция действительна в течении всего срока публикации на
                        сайте, для прекращения действия акции вам нужно снять
                        объявление об акции с публикации на сайте в личном
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
