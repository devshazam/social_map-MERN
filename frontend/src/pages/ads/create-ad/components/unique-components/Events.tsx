

import Col from "react-bootstrap/Col";
import { TextField} from "@mui/material";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Events = (props:any) => {


    // ==========================================================================================================
    return (
        <>
                <Col xs={12} md={6}>
                    <TextField  label="Цена:" variant="outlined" fullWidth sx={{ mb: 1}} 
                                error={Boolean(!props.createObject.cost && props.flag == 0)}
                                onChange={(e:any) => props.changeCreateObject({cost: e.target.value})}
                                />
                </Col>
                <Col xs={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker label="Дата начала:" onChange={(newValue:any) => props.changeCreateObject({startDate: newValue['$d'].getTime()})} sx={{ mb:1, pr: { sm: 0, md: 1}, width: { sm: '100%', md: '50%'}}} />
                        
                        <DatePicker label="Дата конца:" onChange={(newValue:any) => props.changeCreateObject({endDate: newValue['$d'].getTime()})} sx={{ mb:1, width: { sm: '100%', md: '50%'}}}/>
                    </LocalizationProvider>
                </Col>



        </>
    );
};

export default Events;