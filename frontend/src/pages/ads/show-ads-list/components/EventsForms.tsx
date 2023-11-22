import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DistrictForm from "./components/DistrictForm";

import { useDispatch } from "react-redux";

const AllDiscounts = () => {
    const dispatch = useDispatch();

    const [itemSort, setItemSort] = useState("createdAt");
    const [orderSort, setOrderSort] = useState("0");

    useEffect(() => {
        dispatch({ type: "FILTER", payload: { itemSort, orderSort } });
    }, [itemSort, orderSort]);

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
                    label="Сортировать по:"
                >
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => setItemSort(e.target.value)}
                        value={itemSort}
                    >
                        <option value="startDate">Дата начала</option>
                        <option value="cost">Стоимости</option>
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
