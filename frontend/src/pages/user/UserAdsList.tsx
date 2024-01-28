import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from 'react-bootstrap/Button';
import globalParamsObject from '../../parameters/mainAppParameterObject';
import { fetchUserAdsList, deleteUserAdsList } from "../../api/discountAPI";
// import {dimensionsToStyleObject} from '../../utils/helpFunctions'

import {useDispatch} from "react-redux";

const UserAdsList = () => {
    const dispatch = useDispatch();

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
                setAdsList(data);
                setCount(data.length);
            })
            .catch((error: any) => {
                if(error.response && error.response.data) {
                    dispatch({type: "ALERT", payload: {modal: true, variant: 'warning', text: `${error.response.data.message}`}});
                } 
            })
            .finally(() => {
                setSpiner(true);
            });
    }, [page, stateUser.id, deleteFlag]); // <- add the count variable here


    function deleteAds(adId: any) {
        deleteUserAdsList({ adId })
        .then((data: any) => {
            dispatch({type: "ALERT", payload: {modal: true, variant: 'success', text: `Успешно!`}});
            setDeleteFlag(deleteFlag + 1)
        })
        .catch((error: any) => {
            if(error.response && error.response.data) {
                dispatch({type: "ALERT", payload: {modal: true, variant: 'warning', text: `${error.response.data.message}`}});
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
                                            <Card >
                                                <a href={"/ad-view/" + ad._id} style={{backgroundColor: '#cbcbcb'}}>
                                                    <div className="card-user_cab">
                                                        <div className="back_wrap_new">
                                                            <p className={`ad_category_title ad_category_title_${globalParamsObject.main.adsCategoryNames[+ad.adCategory - 1]}`}>
                                                                {ad && globalParamsObject.main.adsCategory[+ad.adCategory - 1]}
                                                            </p>
                                                            <Card.Img className="card_img-user_cab"
                                                                // style={ad.dimensions && {...dimensionsToStyleObject(JSON.parse(ad.dimensions))}}
                                                                variant="top"
                                                                src={ad.image} 
                                                                alt="Объявление davse.ru"
                                                            />
                                                        </div>
                                                    </div>
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
