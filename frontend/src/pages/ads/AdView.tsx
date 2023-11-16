import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import FloatingLabel from "react-bootstrap/FloatingLabel";


const AdView = () => {
    const { adId } = useParams();

    const [goodsItem, setGoodsItem] = useState({});


    // useEffect(() => {
    //     fetchAdById({ adId })
    //         .then((data) => {
    //             setGoodsItem(data);
    //             // console.log("dev", data);
    //         })
    //         .catch((error) => {
    //             if (error.response.data) {
    //                 alert(
    //                     `${error.response.data.message}${error.response.status}`
    //                 );
    //             } else {
    //                 console.log("dev", error);
    //                 alert("Ошибка 141 - Обратитесь к администратору!");
    //             }
    //         });
    // }, [goodsId]);

    return (
        <>
        
        </>
    );
};

export default AdView;
