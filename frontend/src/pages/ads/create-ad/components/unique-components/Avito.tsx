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
    const [mainObject, setMainObject] = useState<any>({});

    const dispatch = useDispatch();

    useEffect(() => {
        if(mainObject.cost && mainObject.avitoCategory){
            dispatch({type: "MAIN", payload: {cost: mainObject.cost, avitoCategory: mainObject.avitoCategory}})
        }
    }, [JSON.stringify(mainObject)])
    
    useEffect(() => {
        if(Object.values(uniqObject).length > 0){
            dispatch({type: "UNIQUE", payload: {uniquePart: JSON.stringify(uniqObject)}})
        }
    }, [JSON.stringify(uniqObject)])

    // ==========================================================================================================

    return (
        <>
         <Col xs={12} md={6}>
                     <TextField label="Цена (плата):" variant="outlined" fullWidth
                                sx={{mb: 1, pr:1, width: { sm: 'none', md: '50%'}}}
                                error={Boolean(!mainObject.cost && props.flag == 0)}
                                onChange={(e) => setMainObject({...mainObject, cost: e.target.value})}/>
                    <FormControl fullWidth sx={{mb: 1, pl:1, width: { sm: 'none', md: '50%'}}}>
                        <InputLabel error={Boolean(!mainObject.avitoCategory && props.flag == 0)}>Категория:</InputLabel>
                        <Select
                            value={mainObject.avitoCategory}
                            error={Boolean(!mainObject.avitoCategory && props.flag == 0)}
                            onChange={(e: any) => setMainObject({...mainObject, avitoCategory: e.target.value})}
                        >
                            { 
                                globalParamsObject.avito.avitoCategory.map((item:any, index:any) => {
                                    return(
                                        <MenuItem key={index} value={index + 1}>{item}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    </Col>


        {mainObject.avitoCategory &&  globalParamsObject.avito.avitoParametrs[mainObject.avitoCategory - 1].map((item:any, index2: any) => {
            return(
        
                <Col xs={12} md={6}>
                    
                    {typeof item === 'string' ?
                    <TextField  label={item} variant="outlined" fullWidth
                                sx={{mb: 1}}
                                onChange={(e) => setUniqObject({...uniqObject, [index2]: [item, e.target.value]})}/>
                    :   
                    <FormControl fullWidth sx={{mb: 1}}>
                        <InputLabel  >{item[0]}</InputLabel>
                        <Select
                            value={uniqObject.discount}
                            onChange={(e) => setUniqObject({...uniqObject, [index2]: [item[0], e.target.value]})}
                        >
                            { 
                                item[1].map((item2:any) =>{
                                    return (
                                    <MenuItem value={item2}>{item2}</MenuItem>
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
