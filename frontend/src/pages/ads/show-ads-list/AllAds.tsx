import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { Map, YMaps } from "@pbe/react-yandex-maps";

import DiscountsForms from "./components/DiscountsForms";
import DistrictForm from "./components/components/DistrictForm";
import EventsForms from "./components/EventsForms";
import AvitoForms from "./components/AvitoForms";

import { fetchAdsList } from "../../../api/discountAPI";
import {dimensionsToStyleObject} from '../../../utils/helpFunctions'


const AllDiscounts = () => {
    const { adCategory } = useParams();

    const [spiner, setSpiner] = useState(false);
    const [adsList, setAdsList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);

    const [filterObject, setFilterObject] = useState<any>({});

    function changefilterObject(agent1:any){
        setFilterObject({...filterObject, ...agent1})
    }

    useEffect(() => {
        if (!adCategory || !Object.values(filterObject).every((i:any) => Boolean(i))) {
            return;
        }
        fetchAdsList({ ...filterObject, page, adCategory })
            .then((data: any) => {
                console.log(data);
                setAdsList(data);
                setCount(data.length);
            })
            .catch((error: any) => {
                if (error.response && error.response.data) {
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
            {/* <p>скидки</p> */}
            <Row className="mb-5">
                <Col xs={12} sm={3} lg={3} className="mb-3">
                    {adCategory === "1" && <DiscountsForms changefilterObject={changefilterObject} filterObject={filterObject}/>}
                    {adCategory === "2" && <DistrictForm changefilterObject={changefilterObject} filterObject={filterObject}/>}
                    {adCategory === "3" && <EventsForms changefilterObject={changefilterObject} filterObject={filterObject}/>}
                    {adCategory === '4' && <AvitoForms changefilterObject={changefilterObject} filterObject={filterObject}/> }
                </Col>
                <Col xs={12} sm={9} lg={9} className="mb-3">
                    <Row className="mb-5">
                        <div
                            style={{
                                width: "100%",
                                height: "130px",
                                borderRadius: "12px",
                                position: "relative",
                            }}
                        >
                            <a href={"/ads-map/" + adCategory}>
                                <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_KEY }}>
                                    <section className="map container">
                                        <Map
                                            state={{
                                                center: [48.707067, 44.516975],
                                                zoom: 10,
                                            }}
                                            width="100%"
                                            height={130}
                                        ></Map>
                                    </section>
                                </YMaps>
                            
                                <div style={{display: 'flex', position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', zIndex: '999'}}>
                                    <p style={{fontSize: '50px', margin: 'auto', width: '80%', color: 'rgb(217 98 98 / 75%)', fontWeight: '100', textAlign: 'center' }}>ОТКРЫТЬ КАРТУ</p>
                                </div>
                            {/* </div> */}
                            </a>
                        </div>
                    </Row>
                    <Row className="mb-5">
                        {spiner ? (
                            <>
                                {count ? 
                                    adsList.map((ad: any, index:number) => {
                                        return(
                                        <Col xs={12} sm={6} lg={3} className="mb-3" key={index} >
                                            <Card>
                                                <a href={"/ad-view/" + ad._id} style={{backgroundColor: '#cbcbcb'}}>
                                                    
                                                    <Card.Img 
                                                        style={ad.dimensions && {...dimensionsToStyleObject(JSON.parse(ad.dimensions))}}
                                                        variant="top"
                                                        src={ad.image} 
                                                    />
                                                </a>
                                                <Card.Body>
                                                    <Card.Title>
                                                        {ad.cost && `Цена: ${ad.cost} р`}<br />
                                                        {/* Остаток: {ad.name} */}
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
