import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Spinner from "react-bootstrap/Spinner";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";

// import { fetchGoodsList, deleteItemByID } from "../../http/goodsAPI";


const AllDiscounts = () => {
    const { AdCategory } = useParams();

    const [spiner, setSpiner] = useState(false);
    const [goodsCustom, setGoodsCustom] = useState({});
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(1);

    const limit:number = 12;
    const [page, setPage] = useState(1);
    const [categoryIt, setCategoryIt] = useState(AdCategory);
    const [itemSort, setItemSort] = useState("createdAt");
    const [orderSort, setOrderSort] = useState("ASC");

    // useEffect(() => {
    //     fetchGoodsList(limit, `${page}`, categoryIt, itemSort, orderSort)
    //         .then((data) => {
    //             console.log(data);
    //             setGoodsCustom(data.rows);
    //             setCount(data.count);
    //         })
    //         .catch((error) => {
    //             if (error.response.data) {
    //                 alert(
    //                     `${error.response.data.message}${error.response.status}`
    //                 );
    //             } else {
    //                 console.log("dev", error);
    //                 alert("Ошибка 138 - Обратитесь к администратору!");
    //             }
    //         })
    //         .finally(() => {
    //             setSpiner(true);
    //         });
    // }, [page, flag, categoryIt, itemSort, orderSort]); // <- add the count variable here

    function choicePage(number:number) {
        setPage(number);
    }

    // async function deleteItem(id) {
    //     deleteItemByID(id)
    //         .then((data) => {
    //             // console.log(data)
    //             setFlag(flag + 1);
    //             alert("Товар удален!");
    //         })
    //         .catch((error) => {
    //             if (error.response.data) {
    //                 alert(
    //                     `${error.response.data.message}${error.response.status}`
    //                 );
    //             } else {
    //                 console.log("dev", error);
    //                 alert("Ошибка 140 - Обратитесь к администратору!");
    //             }
    //         });
    // }

    let midlItem1 = Math.ceil(count / limit);
    let items = [];
    for (let number = 1; number <= midlItem1; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === page}
                onClick={() => choicePage(number)}
            >
                {number}
            </Pagination.Item>
        );
    }
    const paginationBasic = (
        <div>
            <Pagination>{items}</Pagination>
        </div>
    );

    return (
        <>
            <Row className="mb-5">
                <Col xs={12} sm={3} lg={3} className="mb-3">
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
                                onChange={(e) => setCategoryIt(e.target.value)}
                                value={categoryIt}
                            >
                                <option value="krujki">Кружки</option>
                                <option value="futbolki">Футболки</option>
                                <option value="bagety">Багеты</option>
                                <option value="planketki">Плакетки</option>
                                <option value="shtender">Штендеры</option>
                                <option value="magnit">Магнитики</option>
                                <option value="brelok">Брелоки</option>
                                <option value="plenka-avery">
                                    Пленка AVERY
                                </option>
                                <option value="3d-nit">
                                    Нить для 3D печати
                                </option>
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
                                <option value="price">Стоимости</option>
                                <option value="createdAt">Новизне</option>
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
                                <option value="ASC">Возрастание</option>
                                <option value="DESC">Убывание</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>
                </Col>
                <Col xs={12} sm={9} lg={9} className="mb-3">
                    <Row className="mb-5">
                        <div style={{width: '100%', height: '200px', borderRadius: '12px', position: 'relative'}}>
                            <a href='/discounts-map'>
                                <YMaps >
                                    <section className="map container" >
                                            <Map
                                                state={{
                                                    center: [48.707067, 44.516975],
                                                    zoom: 10,
                                                }}
                                                width="100%"
                                                height={200} >
                                            </Map>
                                    </section>
                                </YMaps>
                            </a>
                            <p style={{position: 'absolute', top: '10%', left: '10%', color: "black"}}>Открыть карту полностью</p>
                        </div>

                        {spiner ? (
                            <>
                                {Object.keys(goodsCustom).length ? (
                                    goodsCustom.map((goods) => (
                                        <Col
                                            xs={12}
                                            sm={6}
                                            lg={3}
                                            className="mb-3"
                                            key={goods.id}
                                        >
                                            <Card>
                                                <a
                                                    href={
                                                        "/goods/one/" + goods.id
                                                    }
                                                >
                                                    <Card.Img
                                                        variant="top"
                                                        src={goods.image}
                                                    />
                                                </a>
                                                <Card.Body>
                                                    <Card.Title>
                                                        Цена: {goods.price} р <br/>
                                                        Остаток: {goods.summa}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        {goods.name}
                                                        
                                                    </Card.Text>
                                                    {user.user.role ==
                                                        "ADMIN" && (
                                                        <>
                                                            {/* <Button className="m-2" variant="danger" onClick={() => deleteItem(goods.id)}>Удалить</Button> */}
                                                            <Button
                                                                variant="primary"
                                                                href={
                                                                    "/admin/update-goods/" +
                                                                    goods.id
                                                                }
                                                            >
                                                                Править
                                                            </Button>
                                                        </>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                ) : (
                                    <h3>В данной категории нет товаров!</h3>
                                )}
                            </>
                        ) : (
                            <Spinner
                                className="goods-spiner"
                                animation="border"
                            ></Spinner>
                        )}
                        {paginationBasic}

                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default AllDiscounts;
