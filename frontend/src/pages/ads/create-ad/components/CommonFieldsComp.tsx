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

const CommonFieldsComp = (props:any) => {
    const [discountObject, setDiscountObject] = useState({name: '', description: '', district: ''});
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch({type: "COMMON", payload: discountObject})
    }, [discountObject])



    // ==========================================================================================================

    return (
        <>
                <Col xs={12} md={6}>
                            <TextField  id="outlined-basic" label="Ваше название:" variant="outlined" fullWidth
                                        sx={{mb: 1}}
                                        error={Boolean(!discountObject.name && props.flag == 0)}
                                       onChange={(e) => setDiscountObject({...discountObject, name: e.target.value})}/>

                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" error={Boolean(!discountObject.district && props.flag == 0)}>Ваш район:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={discountObject.district}
                        label="Age"
                        error={Boolean(!discountObject.district && props.flag == 0)}
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
                                error={Boolean(!Boolean(discountObject.description) && props.flag == 0)}
                                onChange={(e) => setDiscountObject({...discountObject, description: e.target.value})}/>


                </Col>



        </>
    );
};

export default CommonFieldsComp;
