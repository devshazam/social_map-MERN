
import Col from "react-bootstrap/Col";
import { TextField} from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import globalParamsObject from '../../../../parameters/mainAppParameterObject'

const CommonFieldsComp = (props:any) => {

    // ==========================================================================================================

    return (
        <>
                <Col xs={12} md={6}>
                    <TextField  id="outlined-basic" label="Ваше название:" variant="outlined" fullWidth
                                sx={{mb: 1}}
                                error={Boolean(!props.createObject.name && props.flag == 0)}
                                onChange={(e:any) => props.changeCreateObject({name: e.target.value})}

                    />
                <FormControl fullWidth sx={{mb: 1}}>
                    <InputLabel error={Boolean(!props.createObject.district && props.flag == 0)}>Ваш район:</InputLabel>
                    <Select
                        error={Boolean(!props.createObject.district && props.flag == 0)}
                        onChange={(e:any) => props.changeCreateObject({district: e.target.value})}
                        value={props.createObject.district ? props.createObject.district : '4'}
                        >
                        { 
                            globalParamsObject.main.districtsNames.map((item:any, index:any) => {
                                return(
                                    <MenuItem key={index} value={index + 1}>{item}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                </Col>
                <Col xs={12} md={6}>
                    <TextField  label="Ваше описание (до 1000 симоволов!):" fullWidth
                                multiline
                                rows={4}
                                sx={{mb: 1}}
                                error={Boolean(!Boolean(props.createObject.description) && props.flag == 0)}
                                onChange={(e:any) => props.changeCreateObject({description: e.target.value})}/>
                </Col>
        </>
    );
};

export default CommonFieldsComp;
