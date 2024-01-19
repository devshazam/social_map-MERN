import  { useState } from "react";
import { useParams } from "react-router-dom";

import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { createDiscount } from "../../../api/discountAPI";

import ImageResizingComp from "./components/ImageResizingComp";
import CommonFieldsComp from "./components/CommonFieldsComp";
import MapChoiceComp from "./components/MapChoiceComp";

import Discounts from "./components/Discounts";
import Events from "./components/Events";
import Avito from "./components/Avito";
import globalParamsObject from '../../../parameters/mainAppParameterObject'

import {useDispatch} from "react-redux";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

// import './CreateAdMidlware.module.scss';

const CreateDiscount = () => {
    const dispatch = useDispatch();
    const stateUser = useSelector((state: any) => state.user.user);

    const { adCategory } = useParams<string>();
    
    const [step, setStep] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [flag, setFlag] = useState<number>(1);
    const [createObject, setCreateObject] = useState<any>({});
console.log(step)
    
    function changeCreateObject(agent1:any){
        setCreateObject({...createObject, ...agent1})
    }
    function nextStep(){
        if (adCategory && !globalParamsObject.main.checkAdCategory[+adCategory - 1][step].every((i:any) => Boolean(createObject[i]))) {
            setFlag(0);
            return;
        }

        setFlag(1);
        setStep(step + 1);
    }
    
    const stepsComponents:any = [<ImageResizingComp flag={flag}  changeCreateObject={changeCreateObject} createObject={createObject}/>,
                                <MapChoiceComp flag={flag}  changeCreateObject={changeCreateObject} createObject={createObject}/>,
                                <CommonFieldsComp flag={flag}  changeCreateObject={changeCreateObject} createObject={createObject}/>,
                                [<Discounts flag={flag} changeCreateObject={changeCreateObject} createObject={createObject}/>,
                                <></>,
                                <Events flag={flag}  changeCreateObject={changeCreateObject} createObject={createObject}/>,
                                <Avito flag={flag}  changeCreateObject={changeCreateObject} createObject={createObject}/>]

]
    let sendToServer = () => {
        if (adCategory && !globalParamsObject.main.checkAdCategory[+adCategory - 1][step].every((i:any) => Boolean(createObject[i]))) {
            setFlag(0);
            return;
        }

        const formData = new FormData();
        Object.entries({...createObject, userId: stateUser.id, adCategory}).map((item: any) => {
            return formData.append(item[0], item[1]);
        });

        setLoading(true)

        createDiscount(formData)
            .then((data) => {
                dispatch({type: "ALERT", payload: {modal: true, variant: 'success', text: `Успешно!`}});
                // alert("Ваше объявление добавлено успешно!");
                setTimeout(function() {window.location.replace("/user/user-ads-list"); }, 800); 
            })
            .catch((error: any) => {
                if (error.response && error.response.data) {
                    alert(
                        `${error.response.data.message}${error.response.status}`
                    );
                } 
            }).finally(() => setLoading(false));
    };

    // ==========================================================================================================

    return (
        <>
            <Row className="create_row">
                { step === 3 ? 
                    <>{adCategory && stepsComponents[step][+adCategory - 1]}</>
                    :
                    stepsComponents[step]
                }
            </Row>

            <Row className="mb-2 create_row">
                <Col xs={12} md={6} className='mb-4'>
                    {((adCategory && step === 2 && +adCategory === 2) || step === 3) ?
                        <>
                            {loading ? 
                                <Button variant="contained" fullWidth color='warning' className="publish-button">
                                    <Spinner animation="border" />
                                </Button>
                                    :
                                <Button variant="contained" fullWidth onClick={sendToServer} color='warning' className="publish-button">
                                    Опубликовать объявление
                                </Button>
                            }
                            <p className="conditions_par">Нажимая "Опубликовать", Вы соглашаетесь с <a href="/conditions">условиями</a> оказания услуг.</p>
                        </>
                            :
                        <Button variant="contained" fullWidth onClick={nextStep} color='secondary' className="publish-button">
                            Следующий шаг
                        </Button>
                    }
                </Col>
            </Row>
        </>
    );
};

export default CreateDiscount;
