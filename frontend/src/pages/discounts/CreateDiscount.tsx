import React, { useState, useEffect }from 'react';
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";
import MapChoiceComp from "../../components/create/MapChoiceComp";
import ImageResizingComp from "../../components/create/ImageResizingComp";
import CommonFieldsComp from "../../components/create/CommonFieldsComp";
import DatePickerComp from "../../components/create/DatePickerComp";
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import { createDiscount } from "../../api/discountAPI";

const CreateDiscount = () => {
    const [discountObject, setDiscountObject] = useState({cost: '',  discount: '', category: ''});

    const [flag, setFalg] = useState(1)
    const flagYu = 0;
    // получить
    const stateImg = useSelector((state:any) => state.app.img);
    const stateMap = useSelector((state:any) => state.app.map);
    const stateCommon = useSelector((state:any) => state.app.common);
    const stateUser = useSelector((state:any) => state.user.user);
    console.log(stateImg, stateMap, 123)
    // console.log(imageOne)

    useEffect(() => {
        let vv = {...discountObject, ...stateCommon};
    }, [stateImg, stateMap, stateCommon, discountObject])
    // console.log(discountObject)

    // useEffect(() => {
    //     console.log(state, 123)
    // }, [state])

    let sendToServer = () => {
        let mOne = {...discountObject, ...stateCommon};
        if(!stateImg || !stateMap || !Object.values(mOne).every(age => Boolean(age))) {
            setFalg(0)
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            return;
        }

        const formData = new FormData();
        formData.append("name", mOne.name);
        formData.append("description", mOne.description);
        formData.append("district", mOne.district);
        formData.append("category", mOne.category);
        formData.append("discount", mOne.discount);
        formData.append("cost", mOne.cost);
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
                {/*<h6>Шаг №2: Заполните общие хар-ки</h6>*/}
                {/*<hr style={{marginBottom: '4px'}} />*/}
                <Col xs={12} md={6}>
                    <TextField  id="outlined-basic" label="Цена со скидкой:" variant="outlined" fullWidth
                                sx={{mb: 1, pr:1, width: { sm: 'none', md: '50%'}}}
                                error={Boolean(!discountObject.cost && flag == 0)}
                                onChange={(e) => setDiscountObject({...discountObject, cost: e.target.value})}/>
                    <FormControl fullWidth sx={{mb: 1, pl:1, width: { sm: 'none', md: '50%'}}}>
                        <InputLabel id="demo-simple-select-label" error={Boolean(!discountObject.discount && flag == 0)}>Размер скидки:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={discountObject.discount}
                            error={Boolean(!discountObject.discount && flag == 0)}
                            label="Age"
                            onChange={(e: any) => setDiscountObject({...discountObject, discount: e.target.value})}
                        >
                            <MenuItem value={5}>5% скидка</MenuItem>
                            <MenuItem value={10}>10% скидка</MenuItem>
                            <MenuItem value={15}>15% скидка</MenuItem>
                            <MenuItem value={20}>20% скидка</MenuItem>
                            <MenuItem value={25}>25% скидка</MenuItem>
                            <MenuItem value={30}>30% скидка</MenuItem>
                            <MenuItem value={35}>35% скидка</MenuItem>
                            <MenuItem value={40}>40% скидка</MenuItem>
                            <MenuItem value={45}>45% скидка</MenuItem>
                            <MenuItem value={50}>50% скидка</MenuItem>
                        </Select>
                    </FormControl>
                </Col>
                <Col xs={12} md={6}>


                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label" error={Boolean(!discountObject.category && flag == 0)}>Категория скидки:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={discountObject.category}
                            error={Boolean(!discountObject.category && flag == 0)}
                            label="Age"
                            onChange={(e: any) => setDiscountObject({...discountObject, category: e.target.value})}
                        >
                            <MenuItem value={5}>Красота и здоровье</MenuItem>
                            <MenuItem value={10}>Все для животных</MenuItem>
                            <MenuItem value={15}>Одежда и обувь</MenuItem>
                            <MenuItem value={20}>Товары для детей</MenuItem>
                            <MenuItem value={25}>Автомобиль</MenuItem>
                            <MenuItem value={30}>Электроника</MenuItem>
                            <MenuItem value={35}>Дом и дача</MenuItem>
                            <MenuItem value={40}>Услуги</MenuItem>
                            <MenuItem value={45}>Хобби и отдых</MenuItem>
                            <MenuItem value={50}>Продукты</MenuItem>
                        </Select>
                    </FormControl>
                </Col>
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
