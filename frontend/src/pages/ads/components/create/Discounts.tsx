import React, { useState, useEffect, useRef }from 'react';

import Col from "react-bootstrap/Col";
import { TextField} from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";


const Discounts = (props:any) => {
    const [uniqObject, setUniqObject] = useState({cost: '',  discount: '', category: ''});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: "UNIQUE", payload: JSON.stringify([ ['cost', uniqObject.cost], ['discount', uniqObject.discount], ['category', uniqObject.category] ])})
    }, [uniqObject])

    // ==========================================================================================================
    return (
        <>
                <Col xs={12} md={6}>
                    <TextField  id="outlined-basic" label="Цена со скидкой:" variant="outlined" fullWidth
                                sx={{mb: 1, pr:1, width: { sm: 'none', md: '50%'}}}
                                error={Boolean(!uniqObject.cost && props.flag == 0)}
                                onChange={(e) => setUniqObject({...uniqObject, cost: e.target.value})}/>
                    <FormControl fullWidth sx={{mb: 1, pl:1, width: { sm: 'none', md: '50%'}}}>
                        <InputLabel id="demo-simple-select-label" error={Boolean(!uniqObject.discount && props.flag == 0)}>Размер скидки:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={uniqObject.discount}
                            error={Boolean(!uniqObject.discount && props.flag == 0)}
                            label="Age"
                            onChange={(e: any) => setUniqObject({...uniqObject, discount: e.target.value})}
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
                        <InputLabel id="demo-simple-select-label" error={Boolean(!uniqObject.category && props.flag == 0)}>Категория скидки:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={uniqObject.category}
                            error={Boolean(!uniqObject.category && props.flag == 0)}
                            label="Age"
                            onChange={(e: any) => setUniqObject({...uniqObject, category: e.target.value})}
                        >
                            <MenuItem value={1}>Красота и здоровье</MenuItem>
                            <MenuItem value={2}>Все для животных</MenuItem>
                            <MenuItem value={3}>Одежда и обувь</MenuItem>
                            <MenuItem value={4}>Товары для детей</MenuItem>
                            <MenuItem value={5}>Автомобиль</MenuItem>
                            <MenuItem value={6}>Электроника</MenuItem>
                            <MenuItem value={7}>Дом и дача</MenuItem>
                            <MenuItem value={8}>Сад и огород</MenuItem>
                            <MenuItem value={9}>Хобби и отдых</MenuItem>
                            <MenuItem value={10}>Продукты</MenuItem>
                            <MenuItem value={11}>Фитнес и спорт</MenuItem>
                        </Select>
                    </FormControl>
                </Col>



        </>
    );
};

export default Discounts;
