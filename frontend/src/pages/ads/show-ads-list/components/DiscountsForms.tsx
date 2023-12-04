
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DistrictForm from "./components/DistrictForm";

import globalParamsObject from '../../../../parameters/mainAppParameterObject'

const DiscountsForms = (props:any) => {



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
                        onChange={(e:any) => props.changefilterObject({discountCategory: e.target.value})}
                        // value={props.filterObject.discountCategory} 
                        >
                            <option key={0} value={0}>Все категории</option>
                        { 
                            globalParamsObject.discounts.discountsCategory.map((item:any, index:any) => {
                                return(
                                    <option key={index + 1} value={index + 1}>{item}</option>
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
                        onChange={(e:any) => props.changefilterObject({itemSort: e.target.value})}
                        // value={props.filterObject.itemSort} 
                        >
                        <option value="createdAt">Дате публикации</option>
                        <option value="cost">Стоимости</option>
                        <option value="discount">Размеру СКИДКИ!</option>
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
                        onChange={(e:any) => props.changefilterObject({orderSort: e.target.value})}
                        value={props.filterObject.orderSort} 
                        >
                        <option value="1">Убывание</option>
                        <option value="0">Возрастание</option>
                    </Form.Select>
                </FloatingLabel>
            </Form.Group>
            <DistrictForm changefilterObject={props.changefilterObject} filterObject={props.filterObject}/>
        </>
    );
};

export default DiscountsForms;
