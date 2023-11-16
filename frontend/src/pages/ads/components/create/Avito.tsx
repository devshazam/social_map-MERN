import React, { useState, useEffect, useRef }from 'react';

import Col from "react-bootstrap/Col";
import { TextField} from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";


const Discounts = (props:any) => {
    const [uniqObject, setUniqObject] = useState<any>([]);
    console.log(uniqObject, 1932940)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({type: "UNIQUE", payload: JSON.stringify([ ['Цена', uniqObject.cost], ['Скидка', uniqObject.discount], ['Категория', uniqObject.category] ])})
    }, [uniqObject])
let array: any = ['Цена со скидкой', ['Размер скидки', [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]]];
    // ==========================================================================================================
    return (
        <>
        { array.map((item:any) => {
            return(
        
                <Col xs={12} md={6}>
                    {typeof item === 'string' ?
                    <TextField  id="outlined-basic" label={item} variant="outlined" fullWidth
                                sx={{mb: 1, pr:1, width: { sm: 'none', md: '50%'}}}
                                onChange={(e) => setUniqObject([...uniqObject, [item, e.target.value]])}/>
                    :   
                    <FormControl fullWidth sx={{mb: 1, pl:1, width: { sm: 'none', md: '50%'}}}>
                        <InputLabel id="demo-simple-select-label" >{item[0]}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={uniqObject.discount}
                            label="Age"
                            onChange={(e) => setUniqObject([...uniqObject, [item[0], e.target.value]])}
                        >
                            { 
                                item[1].map((item2:any) =>{
                                    return (
                                    <MenuItem value={item2}>{item2}% скидка</MenuItem>
                                );
                                })
                            }
                            
                        </Select>
                    </FormControl>
                    }
                </Col>
            );
})
}

        </>
    );
};

export default Discounts;
