import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { useDispatch } from "react-redux";

import globalParamsObject from '../../../../../parameters/mainAppParameterObject'


const AllDiscounts = () => {
    const dispatch = useDispatch();


    const [district, setDistrict] = useState('1');


    useEffect(() => {
        dispatch({type: "FILTER", payload: {district}})
    }, [ district ])


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
                            label="Категория товаров:"
                        >
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => setDistrict(e.target.value)}
                                value={district}
                            >
                            { 
                                globalParamsObject.main.districtsNames.map((item:any, index:any) => {
                                    return(
                                        <option key={index} value={index + 1}>{item}</option>
                                    )
                                })
                            }
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>

               
        </>
    );
};

export default AllDiscounts;
