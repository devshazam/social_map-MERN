import React, { useRef, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

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
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

import DiscountsForms from "./components/DiscountsForms";
import DistrictForm from "./components/components/DistrictForm";
import EventsForms from "./components/EventsForms";
import AvitoForms from "./components/AvitoForms";

import { fetchAdsList } from "../../../api/discountAPI";
import { useSelector } from "react-redux";
import {dimensionsToStyleObject} from '../../../utils/helpFunctions'



const AllDiscounts = () => {
    const { adCategory } = useParams();

    const ref = useRef(null);
    const [spiner, setSpiner] = useState(false);
    const [adsList, setAdsList] = useState([]);
    const [count, setCount] = useState(0);

    const [page, setPage] = useState(1);

    const filterObject = useSelector((state: any) => state.app.filter);




    useEffect(() => {
        console.log('width', ref.current);
      }, [ref.current]);

    console.log(adsList);
    useEffect(() => {
        if (!Object.values(filterObject).every((i:any) => Boolean(i))) {
            return;
        }
        fetchAdsList({ ...filterObject, page, adCategory })
            .then((data: any) => {
                console.log(data);
                setAdsList(data);
                setCount(data.length);
            })
            .catch((error: any) => {
                if (error.response.data) {
                    alert(
                        `${error.response.data.message}${error.response.status}`
                    );
                } else {
                    console.log("dev", error);
                    alert("Ошибка 138 - Обратитесь к администратору!");
                }
            })
            .finally(() => {
                setSpiner(true);
            });
    }, [page, JSON.stringify(filterObject)]); // <- add the count variable here

    function choicePage(number: number) {
        setPage(number);
    }

    let midlItem1 = Math.ceil(count / 8);
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
                    {adCategory === "1" && <DiscountsForms />}
                    {adCategory === "2" && <DistrictForm />}
                    {adCategory === "3" && <EventsForms />}
                    {adCategory === '4' && <AvitoForms /> }
                </Col>
                <Col xs={12} sm={9} lg={9} className="mb-3">
                    <Row className="mb-5">
                        <div
                            style={{
                                width: "100%",
                                height: "200px",
                                borderRadius: "12px",
                                position: "relative",
                            }}
                        >
                            <a href={adCategory === '4' ? "/ads-map/" + adCategory + "/?avitoCategory=" + filterObject.avitoCategory : "/ads-map/" + adCategory}>
                                <YMaps>
                                    <section className="map container">
                                        <Map
                                            state={{
                                                center: [48.707067, 44.516975],
                                                zoom: 10,
                                            }}
                                            width="100%"
                                            height={200}
                                        ></Map>
                                    </section>
                                </YMaps>
                            </a>
                            <p
                                style={{
                                    position: "absolute",
                                    top: "10%",
                                    left: "10%",
                                    color: "black",
                                }}
                            >
                                Открыть карту полностью
                            </p>
                        </div>
                    </Row>
                    <Row className="mb-5">
                        {spiner ? (
                            <>
                                {count ? 
                                    adsList.map((ad: any) => {

                                        return(
                                        <Col
                                            xs={12}
                                            sm={6}
                                            lg={3}
                                            className="mb-3"
                                            key={ad.id}
                                        >
                                            <Card>
                                                <a href={"/ad-view/" + ad._id}>
                                                    <Card.Img  ref={ref}
                                                        style={ad.dimensions && {...dimensionsToStyleObject(JSON.parse(ad.dimensions))}}
                                                        variant="top"
                                                        src={ad.image} 
                                                    />
                                                </a>
                                                <Card.Body>
                                                    <Card.Title>
                                                        Цена: {ad.cost} р <br />
                                                        Остаток: {ad.summa}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        {ad.name}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>);
                                    })
                                 : (
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
