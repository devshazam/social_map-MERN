import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { useDispatch } from "react-redux";

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
                                <option value="1">Ворошиловский</option>
                                <option value="2">Дзержинский</option>
                                <option value="3">Кировский</option>
                                <option value="4">Красноармейский</option>
                                <option value="5">Краснооктябрьский</option>
                                <option value="6">Советский</option>
                                <option value="7">Тракторозаводский</option>
                                <option value="8">Центральный</option>


                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>

               
        </>
    );
};

export default AllDiscounts;
