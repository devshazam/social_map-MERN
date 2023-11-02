import React, { useState, useEffect }from 'react';


import { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const DatePickerComp = () => {

    const [value, setValue] = React.useState<Dayjs | null>(null);

    // ==========================================================================================================

    return (
        <>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={value} onChange={(newValue) => setValue(newValue)} />
                        </DemoContainer>
                    </LocalizationProvider>

        </>
    );
};

export default DatePickerComp;
