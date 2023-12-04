import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";


import globalParamsObject from '../../../../../parameters/mainAppParameterObject'


const DistrictForm = (props:any) => {


    // ==============================================================================================
    return (
        <>
                    <Form.Group
                        as={Col}
                        md="12"
                        controlId="formGridState"
                        className="mb-3"
                    >
                        <FloatingLabel
                            controlId="floatingPassword"
                            label="Район города:"
                        >
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e:any) => props.changefilterObject({district: e.target.value})}
                                // value={props.filterObject.filterObject.district} 
                                >
                                <option key={'0'} value={'0'}>Все районы</option>
                            { 
                                globalParamsObject.main.districtsNames.map((item:any, index:any) => {
                                    return(
                                        <option key={index + 1} value={index + 1}>{item}</option>
                                    )
                                })
                            }
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
        </>
    );
};

export default DistrictForm;
