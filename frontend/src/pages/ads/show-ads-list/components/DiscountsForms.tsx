import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DistrictForm from "./components/DistrictForm";

import { useDispatch } from "react-redux";

import globalParamsObject from '../../../../parameters/mainAppParameterObject'

const AllDiscounts = () => {
    const dispatch = useDispatch();

    const { adCategory } = useParams();

    const [discountCategory, setDiscountCategory] = useState("1");
    const [itemSort, setItemSort] = useState("createdAt");
    const [orderSort, setOrderSort] = useState("0");

    useEffect(() => {
        dispatch({
            type: "FILTER",
            payload: { discountCategory, itemSort, orderSort },
        });
    }, [discountCategory, itemSort, orderSort]);

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
                        onChange={(e) => setDiscountCategory(e.target.value)}
                        value={discountCategory}
                    >
                        { 
                            globalParamsObject.discounts.discountsCategory.map((item:any, index:any) => {
                                return(
                                    <option key={index} value={index + 1}>{item}</option>
                                )
                            })
                        }

                    </Form.Select>
                </FloatingLabel>
            </Form.Group>
            <Form.Group
                as={Col}
                md="12"
                controlId="formGridState"
                className="mb-3"
            >
                <FloatingLabel
                    controlId="floatingPassword"
                    label="Сортировать по:"
                >
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setItemSort(e.target.value)}
                        value={itemSort}
                    >
                        <option value="createdAt">Новизне</option>
                        <option value="cost">Стоимости</option>
                        <option value="discount">Размер Скидки</option>
                    </Form.Select>
                </FloatingLabel>
            </Form.Group>
            <Form.Group
                as={Col}
                md="12"
                controlId="formGridState"
                className="mb-3"
            >
                <FloatingLabel
                    controlId="floatingPassword"
                    label="Порядок сортировки:"
                >
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setOrderSort(e.target.value)}
                        value={orderSort}
                    >
                        <option value="0">Возрастание</option>
                        <option value="1">Убывание</option>
                    </Form.Select>
                </FloatingLabel>
            </Form.Group>
            <DistrictForm />
        </>
    );
};

export default AllDiscounts;
