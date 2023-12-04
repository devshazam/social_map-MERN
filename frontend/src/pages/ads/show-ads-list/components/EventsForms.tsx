import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DistrictForm from "./components/DistrictForm";


const EventsForms = (props:any) => {

    //===========================================================================================
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
                        onChange={(e:any) => props.changefilterObject({itemSort: e.target.value})}
                    >
                        <option value="createdAt">Дате публикации</option>
                        <option value="startDate">Дате начала</option>
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
                        onChange={(e:any) => props.changefilterObject({orderSort: e.target.value})}
                    >
                        <option value="1">Убывание</option>
                        <option value="0">Возрастание</option>
                    </Form.Select>
                </FloatingLabel>
            </Form.Group>
            <DistrictForm />
        </>
    );
};

export default EventsForms;
