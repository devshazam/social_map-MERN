

import Col from "react-bootstrap/Col";
import { TextField} from "@mui/material";
import {useMemo} from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Events = (props:any) => {
    const oldStartDate = useMemo<string>(() => new Date(+props.createObject.startDate).toISOString().split('T')[0], [])
    const oldEndDate = useMemo<string>(() => new Date(+props.createObject.endDate).toISOString().split('T')[0], [])


    // ==========================================================================================================
    return (
        <>

                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker 
                        // label={f} 
                        label={oldStartDate}
                        onChange={(newValue:any) => props.changeCreateObject({startDate: newValue['$d'].getTime()})} sx={{ mb:1, pr: { sm: 0, md: 1}, width: { sm: '100%', md: '50%'}}} />
                        
                        <DatePicker 
                        label={oldEndDate} 
                        onChange={(newValue:any) => props.changeCreateObject({endDate: newValue['$d'].getTime()})} sx={{ mb:1, width: { sm: '100%', md: '50%'}}}/>
                    </LocalizationProvider>




        </>
    );
};

export default Events;