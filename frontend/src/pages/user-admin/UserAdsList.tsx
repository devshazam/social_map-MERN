import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from 'react-bootstrap/Button';

import { fetchUserAdsList, deleteUserAdsList } from "../../api/discountAPI";
import {dimensionsToStyleObject} from '../../utils/helpFunctions'

const UserAdsList = () => {

    const [spiner, setSpiner] = useState(false);
    const [adsList, setAdsList] = useState([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);
    const [deleteFlag, setDeleteFlag] = useState(0);

    const stateUser = useSelector((state: any) => state.user.user);

    useEffect(() => {
        if (!page || !stateUser.id) {
            return;
        }
        fetchUserAdsList({ page, userId: stateUser.id })
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
    }, [page, stateUser.id, deleteFlag]); // <- add the count variable here


    function deleteAds(adId: any) {
        deleteUserAdsList({ adId })
        .then((data: any) => {
            console.log(data);
            alert('Объявление успешно удалено!')
            setDeleteFlag(deleteFlag + 1)
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
    }

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
                                                    {ad.name}
                                                    </Card.Title>
                                                </Card.Body>
                                                <Button variant="warning" href={`/user/user-update-one/${ad._id}`}>Редактировать</Button>
                                                <Button variant="danger" onClick={() => deleteAds(ad._id)}>Удалить</Button>
                                            </Card>
                                        </Col>);
                                    })
                                 : (
                                    <h3>У вас нет действующих объявлений!</h3>
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
        </>
    );
};

export default UserAdsList;
