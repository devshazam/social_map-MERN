import React, { useState, useEffect, useRef }from 'react';

import Col from "react-bootstrap/Col";
import { TextField} from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import globalParamsObject from '../../../../../parameters/mainAppParameterObject'


const Discounts = (props:any) => {
    const [uniqObject, setUniqObject] = useState<any>({});

    useEffect(() => {
        if(Object.values(uniqObject).length > 0){
            props.changeCreateObject({uniquePart: JSON.stringify(uniqObject)})
        }
    }, [JSON.stringify(uniqObject)])

    // ==========================================================================================================

    return (
        <>
         <Col xs={12} md={6}>
                     <TextField label="Цена (плата):" variant="outlined" fullWidth
                                sx={{mb: 1, pr: { sm: 0, md: 1}, width: { sm: 'none', md: '50%'}}}
                                error={Boolean(!props.createObject.cost && props.flag == 0)}
                                onChange={(e:any) => props.changeCreateObject({cost: e.target.value})}
                    />

                    <FormControl fullWidth sx={{mb: 1, width: { sm: 'none', md: '50%'}}}>
                        <InputLabel error={Boolean(!props.createObject.avitoCategory && props.flag == 0)}>Категория:</InputLabel>
                        <Select
                            value={props.createObject.avitoCategory ? props.createObject.avitoCategory : '5'}
                            // defaultValue={'5'}
                            error={Boolean(!props.createObject.avitoCategory && props.flag == 0)}
                            onChange={(e:any) => props.changeCreateObject({avitoCategory: e.target.value})}
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


        {globalParamsObject.avito.avitoParametrs[(props.createObject.avitoCategory) ? props.createObject.avitoCategory - 1 : 4 ].map((item:any, index2: any) => {
            return(
        
                <Col xs={12} md={6} key={index2}>
                    
                    {typeof item === 'string' ?
                    <TextField  label={item} variant="outlined" fullWidth
                                sx={{mb: 1}}
                                onChange={(e) => setUniqObject({...uniqObject, [index2]: [item, e.target.value]})}/>
                    :   
                    <FormControl fullWidth sx={{mb: 1}}>
                        <InputLabel  >{item[0]}</InputLabel>
                        <Select
                        value={item[1][0]}
                            onChange={(e) => setUniqObject({...uniqObject, [index2]: [item[0], e.target.value]})}
                        >
                            { 
                                item[1].map((item2:any, index3:any) =>{
                                    return (
                                    <MenuItem key={index3} value={item2}>{item2}</MenuItem>
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
