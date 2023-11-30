import React, { useState, useEffect, useRef }from 'react';

import Col from "react-bootstrap/Col";
import { TextField} from "@mui/material";

import {useDispatch, useSelector} from "react-redux";

import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Events = (props:any) => {
    const [mainObject, setMainObject] = useState<any>({});
    // const [cost, setCost] = useState<string>('');
    // const [startDate, setStartDate] = React.useState<any>(null);
    // const [endDate, setEndDate] = React.useState<any>(null);

    const dispatch = useDispatch();
    
    useEffect(() => {
        if(mainObject.cost && mainObject.startDate && mainObject.endDate){
            dispatch({type: "MAIN", payload: {cost: mainObject.cost, startDate: mainObject.startDate, endDate: mainObject.endDate['$d'].getTime()}})
        }
    }, [JSON.stringify(mainObject)])

    // ==========================================================================================================
    return (
        <>
                <Col xs={12} md={6}>
                    <TextField  label="Цена со скидкой:" variant="outlined" fullWidth sx={{ mb: 1}} 
                                error={Boolean(!mainObject.cost && props.flag == 0)}
                                onChange={(e) => setMainObject({...mainObject, cost: e.target.value})}/>
                </Col>
                <Col xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker label="Дата начала:" onChange={(newValue:any) => setMainObject({...mainObject, startDate: newValue['$d'].getTime()})} sx={{ mb:1, width: { sm: '100%', md: '50%'}}} />
                        <DatePicker label="Дата конца:" onChange={(newValue) => setMainObject({...mainObject, endDate: newValue})} sx={{ mb:1, width: { sm: '100%', md: '50%'}}}/>
                    </LocalizationProvider>
                </Col>



        </>
    );
};

export default Events;