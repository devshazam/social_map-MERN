import React, { useState, useEffect }from 'react';
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import { TextField} from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";




import MapChoice from "../../components/create/MapChoice";
import ImageResizing from "../../components/create/ImageResizing";
const CreateDiscount = () => {
    const [discountObject, setDiscountObject] = useState({name: '', description: '', cost: '', costOld: '', discount: '', category: ''});

    // получить
    const stateImg = useSelector((state:any) => state.app.img);
    const stateMap = useSelector((state:any) => state.app.map);
    console.log(stateImg, stateMap, 123)
    // console.log(imageOne)
    // console.log(discountObject)

    // useEffect(() => {
    //     console.log(state, 123)
    // }, [state])

    let sendToServer = () => {

        const formData = new FormData();
        formData.append("name", discountObject.name);
        formData.append("description", discountObject.description);
        formData.append("category", discountObject.category);
        formData.append("discount", discountObject.discount);
        formData.append("cost", discountObject.cost);
        formData.append("costOld", discountObject.costOld);
        // formData.append("image", dataURIToBlob(imageOne));
        // formData.append("priceImg", `${Math.ceil(+priceImg)}`);
        // formData.append("userId", `${user.user.id}`);

    }

    //

    // ==========================================================================================================

    return (
        <>
            <MapChoice />

            <Row className="mb-3"><h6>Шаг №2: Заполните общие хар-ки</h6>
                <hr/>
                <Col xs={12} md={6}>
                            <TextField sx={{ p: 1, width: { sm: 'none', md: '50%' } }} id="outlined-basic" label="Название" variant="outlined" fullWidth
                                       onChange={(e) => setDiscountObject({...discountObject, name: e.target.value})}/>

                </Col>
                <Col xs={12} md={6}>
                    <FormControl fullWidth sx={{ p: 1, width: { sm: 'none', md: '50%' } }}>
                        <InputLabel id="demo-simple-select-label">Скидка</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={discountObject.discount}
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

                    <FormControl fullWidth sx={{ p: 1, width: { sm: 'none', md: '50%' } }}>
                        <InputLabel id="demo-simple-select-label">Категория товаров и услуг</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={discountObject.category}
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
                            <MenuItem value={50}>50% скидка</MenuItem>
                        </Select>
                    </FormControl>
                </Col>
            </Row>

            <ImageResizing />
        </>
    );
};

export default CreateDiscount;
