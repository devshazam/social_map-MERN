import React, { useState, useEffect, useRef }from 'react';

import Col from "react-bootstrap/Col";
import { TextField} from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";

import globalParamsObject from '../../../../../parameters/mainAppParameterObject'

const Discounts = (props:any) => {
    const [uniqObject, setUniqObject] = useState<any>({});

    const dispatch = useDispatch();

    useEffect(() => {
        if(uniqObject.cost && uniqObject.discount && uniqObject.discountCategory){

            dispatch({type: "MAIN", payload: {cost: uniqObject.cost, discount: uniqObject.discount, discountCategory: uniqObject.discountCategory}})
        }
    }, [JSON.stringify(uniqObject)])




    // ==========================================================================================================
    return (
        <>
                <Col xs={12} md={6}>
                    <TextField label="Цена со скидкой:" variant="outlined" fullWidth
                                sx={{mb: 1, width: { sm: 'none', md: '50%'}}}
                                error={Boolean(!uniqObject.cost && props.flag == 0)}
                                onChange={(e) => setUniqObject({...uniqObject, cost: e.target.value})}/>
                    <FormControl fullWidth sx={{mb: 1, width: { sm: 'none', md: '50%'}}}>
                        <InputLabel  error={Boolean(!uniqObject.discount && props.flag == 0)}>Размер скидки:</InputLabel>
                        <Select
                            value={uniqObject.discount}
                            error={Boolean(!uniqObject.discount && props.flag == 0)}
                            onChange={(e: any) => setUniqObject({...uniqObject, discount: e.target.value})}
                        >
                            { 
                                globalParamsObject.discounts.discountSize.map((item:any, index:any) => {
                                    return(
                                        <MenuItem key={index} value={item}>{item}%</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Col>
                <Col xs={12} md={6}>


                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label" error={Boolean(!uniqObject.discountCategory && props.flag == 0)}>Категория скидки:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={uniqObject.discountCategory}
                            error={Boolean(!uniqObject.discountCategory && props.flag == 0)}
                            label="Age"
                            onChange={(e: any) => setUniqObject({...uniqObject, discountCategory: e.target.value})}
                        >
                            { 
                                globalParamsObject.discounts.discountsCategory.map((item:any, index:any) => {
                                    return(
                                        <MenuItem key={index} value={index + 1}>{item}</MenuItem>
                                    )
                                })
                            }

                        </Select>
                    </FormControl>
                </Col>



        </>
    );
};

export default Discounts;
