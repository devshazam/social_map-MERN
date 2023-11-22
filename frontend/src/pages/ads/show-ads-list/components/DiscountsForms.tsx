import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DistrictForm from "./components/DistrictForm";

import { useDispatch } from "react-redux";

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
                        <option value="1">Красота и здоровье</option>
                        <option value="2">Все для животных</option>
                        <option value="3">Одежда и обувь</option>
                        <option value="4">Товары для детей</option>
                        <option value="5">Автомобиль</option>
                        <option value="6">Электроника</option>
                        <option value="7">Хобби и отдых</option>
                        <option value="8">Дом и дача</option>
                        <option value="9">Продукты</option>
                        <option value="10">Фитнес и спорт</option>
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
