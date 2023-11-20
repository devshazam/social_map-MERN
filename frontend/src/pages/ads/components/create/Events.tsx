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
    const [cost, setCost] = useState<string>('');
    const [startDate, setStartDate] = React.useState<any>(null);
    const [endDate, setEndDate] = React.useState<any>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(startDate && endDate){
        dispatch({type: "MAIN", payload: {cost, startDate: startDate['$d'].getTime(), endDate: endDate['$d'].getTime()}})
        }
    
    }, [cost, startDate, endDate])

    // ==========================================================================================================
    return (
        <>
                <Col xs={12} md={6}>
                    <TextField  id="outlined-basic" label="Цена со скидкой:" variant="outlined" fullWidth
                                
                                error={Boolean(!cost && props.flag == 0)}
                                onChange={(e) => setCost(e.target.value)}/>

                </Col>
                <Col xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
<DatePicker value={startDate} onChange={(newValue) => setStartDate(newValue)} sx={{ m: 1, width: { sm: 'none', md: '45%'}}} />
<DatePicker value={endDate} onChange={(newValue) => setEndDate(newValue)} sx={{ m: 1, width: { sm: 'none', md: '45%'}}}/>
                     
                    </LocalizationProvider>
                </Col>



        </>
    );
};

export default Events;