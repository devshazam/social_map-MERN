import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DistrictForm from "./components/DistrictForm";

import globalParamsObject from '../../../../parameters/mainAppParameterObject'

import { useDispatch } from "react-redux";

const AllDiscounts = () => {
    const dispatch = useDispatch();

    let [searchParams, setSearchParams] = useSearchParams()
    const avitoCategory =  searchParams.get("avitoCategory") || '5';
    
    const [mainObject, setMainObject] = useState<any>({avitoCategory, itemSort: "cost", orderSort: '0'});
    useEffect(() => {
        dispatch({
            type: "FILTER",
            payload: {...mainObject},
        });
    }, [JSON.stringify(mainObject)]);

//_____________________________________________________________________________________________
    return (
        <>
            <Form.Group as={Col} md="12" controlId="formGridState" className="mb-3" >
                <FloatingLabel
                    controlId="floatingPassword"
                    label="Категория товаров:"
                >
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e:any) => setMainObject({...mainObject, avitoCategory: e.target.value})}
                        value={mainObject.avitoCategory} >
                        { 
                                globalParamsObject.avito.avitoCategory.map((item:any, index:any) => {
                                    return(
                                        <option key={index} value={index + 1}>{item}</option>
                                    )
                                })
                            }

                    </Form.Select>
                </FloatingLabel>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="formGridState" className="mb-3" >
                <FloatingLabel
                    controlId="floatingPassword"
                    label="Сортировать по:" >
                    <Form.Select
                        aria-label="Default select example"
                        onChange={(e:any) => setMainObject({...mainObject, itemSort: e.target.value})}
                        value={mainObject.itemSort} 
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
                        onChange={(e:any) => setMainObject({...mainObject, orderSort: e.target.value})}
                        value={mainObject.orderSort}  >
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
