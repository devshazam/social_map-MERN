import React from "react";

import Col from "react-bootstrap/Col";
import { TextField} from "@mui/material";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Events = (props:any) => {


    // ==========================================================================================================
    return (
        <>
                <Col xs={12} md={{ span: 6, offset: 3 }}>
                    <TextField  label="7) Введите цену*:" variant="outlined" fullWidth sx={{ mb: 1}} 
                                error={Boolean(!props.createObject.cost && props.flag === 0)}
                                onChange={(e:any) => props.changeCreateObject({cost: e.target.value})}
                                />
                </Col>
                <Col xs={12} md={{ span: 6, offset: 3 }} className="mb-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker label="8) Выберите дату начала*:" onChange={(newValue:any) => props.changeCreateObject({startDate: newValue['$d'].getTime()})} sx={{ width: "100%" }} />
                        
                        {/* <DatePicker label="9) Выберите дату конца*:" onChange={(newValue:any) => props.changeCreateObject({endDate: newValue['$d'].getTime()})} sx={{ mb:1}}/> */}
                    </LocalizationProvider>
                </Col>
                <Col xs={12} md={{ span: 6, offset: 3 }} className="mb-2">
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        {/* <DatePicker label="8) Выберите дату начала*:" onChange={(newValue:any) => props.changeCreateObject({startDate: newValue['$d'].getTime()})} sx={{ width: "100%" }} /> */}
                        
                        <DatePicker label="9) Выберите дату конца*:" onChange={(newValue:any) => props.changeCreateObject({endDate: newValue['$d'].getTime()})} sx={{ width: "100%" }} />
                    </LocalizationProvider>
                </Col>



        </>
    );
};

export default Events;