import React, { useState, useEffect, useRef }from 'react';

import Col from "react-bootstrap/Col";
import { TextField} from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListGroup from "react-bootstrap/ListGroup";

import globalParamsObject from '../../../parameters/mainAppParameterObject'


const Discounts = (props:any) => {
    const [uniqObject, setUniqObject] = useState<any>(JSON.parse(props.createObject.uniquePart));

    useEffect(() => {
        if(Object.values(uniqObject).length > 0){
            props.changeCreateObject({uniquePart: JSON.stringify(uniqObject)})
        }
    }, [JSON.stringify(uniqObject)])

    // ==========================================================================================================

    return (
        <>
                <ListGroup.Item>
                    <FormControl fullWidth >
                        <InputLabel error={Boolean(!props.createObject.avitoCategory && props.flag == 0)}>Категория:</InputLabel>
                        <Select
                            value={props.createObject.avitoCategory}
                            // defaultValue={''}
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
                </ListGroup.Item>


        {props.createObject.avitoCategory && globalParamsObject.avito.avitoParametrs[props.createObject.avitoCategory - 1].map((item:any, index2: any) => {
            return(
        
                <ListGroup.Item key={index2}>
                    
                    {typeof item === 'string' ?
                    <TextField  label={item} variant="outlined" fullWidth
                                sx={{mb: 1}}
                                value={JSON.parse(props.createObject.uniquePart)[index2][1]}
                                onChange={(e) => setUniqObject({...uniqObject, [index2]: [item, e.target.value]})}/>
                    :   
                    <FormControl fullWidth sx={{mb: 1}}>
                        <InputLabel  >{item[0]}</InputLabel>
                        <Select
                        value={JSON.parse(props.createObject.uniquePart)[index2][1]}
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
                </ListGroup.Item>
            );
            })
        }

        </>
    );
};

export default Discounts;
