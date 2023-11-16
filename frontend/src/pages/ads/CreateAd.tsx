import React, { useState, useEffect }from 'react';
import { useParams } from "react-router-dom";

import {Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import { createDiscount } from "../../api/discountAPI";

import ImageResizingComp from "../../components/create/ImageResizingComp";
import CommonFieldsComp from "../../components/create/CommonFieldsComp";
import MapChoiceComp from "../../components/create/MapChoiceComp";
import Discounts from './components/create/Discounts';
import Events from './components/create/Events';
import Avito from './components/create/Avito';


const CreateDiscount = () => {
    const [flag, setFalg] = useState(1)

    const { adCategory } = useParams<any>();

    const stateImg = useSelector((state:any) => state.app.img);
    const stateMap = useSelector((state:any) => state.app.map);
    const stateCommon = useSelector((state:any) => state.app.common);
    const stateUnique = useSelector((state:any) => state.app.unique);
    const stateUser = useSelector((state:any) => state.user.user);

console.log(stateUnique, 11111)
    let sendToServer = () => {
        if(!stateImg || !stateMap || !Object.values(stateCommon).every(q => Boolean(q)) || !JSON.parse(stateUnique).every((i: any) => Boolean(i[1])) || !stateUser) {
            console.log(Boolean(JSON.parse(stateUnique).every((i: any) => Boolean(i[1]))))
            setFalg(0)
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            return;
        }

        const formData = new FormData();
        formData.append("adCategory", String(adCategory));
        formData.append("uniquePart", stateUnique);

        formData.append("name", stateCommon.name);
        formData.append("description", stateCommon.description);
        formData.append("district", stateCommon.district);
        formData.append("img", stateImg);
        formData.append("latitude", stateMap.coordinates[0]);
        formData.append("longitude", stateMap.coordinates[1]);
        formData.append("address", stateMap.address);
        formData.append("userId", stateUser.id);

        createDiscount(formData).then((data) => {
            console.log(data)
        } )
    }

    //

    // ==========================================================================================================

    return (
        <>
            <Row className="mb-5">
                <h5>Шаг №1: Заполните полный адрес, включая номер и литеру дома.</h5>
                <hr/>
                <MapChoiceComp flag={flag}/>
            </Row>
            <Row className="mb-2">
                <h5>Шаг №2: Заполните общие хар-ки</h5>
                <hr/>
                <CommonFieldsComp  flag={flag}/>
            </Row>
            <Row className="mb-5">
                { adCategory && (<>
                    {+adCategory == 1 && <Discounts  flag={flag}/> }
              
                    {+adCategory == 3 && <Events  flag={flag}/> }
                    {+adCategory == 4 && <Avito  flag={flag}/> }



                </>)}

            </Row>
            <Row className="mb-5">
                <h5>Шаг №3: Загрузите картинку квадратной формы в формате: jpg, jpeg, png </h5><hr/>
                <ImageResizingComp flag={flag}/>
            </Row>
            <Row className="mb-">
                <h5>Шаг №4: Публикация объявление о скидки</h5>
                <hr style={{marginBottom: '10px'}} />

                <h6>Нажимая на кнопку "Опубликовать" вы принимаете условия предоставления услуги:</h6>
                <ol>
                    <li>Срок проведения акции ограничен исключительно фактом публикации акции на сайте, т.е. предоставленная вами акция действительна в течении всего срока публикации на сайте, для прекращения действия акции вам нужно снять объявление об акции с публикации на сайте в личном кабинете!</li>
                    <li>Общие условия предоставления услуги изложенные в договре-оферете по ссылке</li>
                </ol>
                <Button variant="contained" fullWidth
                        onClick={sendToServer}>Опубликовать объявление</Button>

            </Row>
        </>
    );
};

export default CreateDiscount;
