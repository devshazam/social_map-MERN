import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Footer from "./components/Footer";
import HeaderAbove from "./components/HeaderAbove";

import {useSelector} from "react-redux";

const LayoutCompany = () => {

    const stateIsAuth = useSelector((state:any) => state.user.isAuth);
    const stateUser = useSelector((state:any) => state.user.user);
    return (
        <>
            <HeaderAbove />
            <Header />
            <Container className="main-cont">
                { (stateIsAuth && stateUser.role === "COMPANY") ? <Outlet /> : <Navigate to="/" />}
            </Container>
            <Footer />
        </>
    );
};

export default LayoutCompany;
