import React, { useState, useEffect, useRef }from 'react';

import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import { TextField} from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const CommonFieldsComp = () => {
    const [discountObject, setDiscountObject] = useState({name: '', description: '', district: ''});
    const [test, setTest] = useState('')

    const handleMessageChange = (event: any) => {
        // 👇️ access textarea value
        setTest(event.target.value);
        console.log(event.target.value);
    };
    console.log(test)
    console.log(discountObject)


    // ==========================================================================================================

    return (
        <>


            <Row className="mb-3"><h6>Шаг №2: Заполните общие хар-ки</h6>
                <hr/>
                <Col xs={12} md={6}>
                            <TextField  id="outlined-basic" label="Ваше название:" variant="outlined" fullWidth
                                        sx={{mb: 1}}
                                       onChange={(e) => setDiscountObject({...discountObject, name: e.target.value})}/>

                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Ваш район:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={discountObject.district}
                        label="Age"
                        onChange={(e: any) => setDiscountObject({...discountObject, district: e.target.value})} >
                        <MenuItem value={1}>Ворошиловский</MenuItem>
                        <MenuItem value={2}>Дзержинский</MenuItem>
                        <MenuItem value={3}>Кировский</MenuItem>
                        <MenuItem value={4}>Красноармейский</MenuItem>
                        <MenuItem value={5}>Краснооктябрьский</MenuItem>
                        <MenuItem value={6}>Советский</MenuItem>
                        <MenuItem value={7}>Тракторозаводский</MenuItem>
                        <MenuItem value={8}>Центральный</MenuItem>
                    </Select>
                </FormControl>
                </Col>
                <Col xs={12} md={6}>

                    <TextField  id="outlined-basic" label="Ваше описание:"  fullWidth
                                multiline
                                rows={4}
                                sx={{mb: 1}}
                                onChange={(e) => setDiscountObject({...discountObject, name: e.target.value})}/>


                </Col>
            </Row>


        </>
    );
};

export default CommonFieldsComp;
