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
    const [mainObject, setMainObject] = useState<any>({});

    const dispatch = useDispatch();
    
    
    let array: any = [['Цена со скидкой', ['Размер скидки', [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]]],
                        ['Цена со скидкой', ['Размер скидки', [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]]],
    ]


    useEffect(() => {
        dispatch({type: "MAIN", payload: {cost: mainObject.cost, avitoCategory: mainObject.discountCategory}})


        dispatch({type: "UNIQUE", payload: JSON.stringify([ ['Цена', uniqObject.cost], ['Скидка', uniqObject.discount], ['Категория', uniqObject.category] ])})
    }, [uniqObject])
    // ==========================================================================================================
    return (
        <>
         <Col xs={12} md={6}>
                     <TextField  id="outlined-basic" label="Цена:" variant="outlined" fullWidth
                                sx={{mb: 1, pr:1, width: { sm: 'none', md: '50%'}}}
                                error={Boolean(!mainObject.cost && props.flag == 0)}
                                onChange={(e) => setMainObject({...mainObject, cost: e.target.value})}/>
                    <FormControl fullWidth sx={{mb: 1, pl:1, width: { sm: 'none', md: '50%'}}}>
                        <InputLabel id="demo-simple-select-label" error={Boolean(!mainObject.avitoCategory && props.flag == 0)}>Размер скидки:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={mainObject.avitoCategory}
                            error={Boolean(!mainObject.avitoCategory && props.flag == 0)}
                            label="Age"
                            onChange={(e: any) => setMainObject({...mainObject, avitoCategory: e.target.value})}
                        >
                            <MenuItem value={1}>Посуточная аренда</MenuItem>
                            <MenuItem value={2}>Длительная аренда</MenuItem>
                            <MenuItem value={3}>Продажа жилья</MenuItem>
                            <MenuItem value={4}>Продажа автомобилей</MenuItem>
                            <MenuItem value={5}>Личные вещи</MenuItem>
                            <MenuItem value={6}>Электроника</MenuItem>
                            <MenuItem value={7}>Работа</MenuItem>
                            <MenuItem value={8}>Услуги</MenuItem>
                        </Select>
                    </FormControl>
                    </Col>


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
