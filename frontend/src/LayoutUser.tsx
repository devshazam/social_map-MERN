import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Footer from "./components/Footer";
import LoginPage from "./components/modal/LoginPage";
import RegPage from "./components/modal/RegPage";
import HeaderAbove from "./components/HeaderAbove";

import {useSelector} from "react-redux";

const LayoutUser = () => {

    const stateIsAuth = useSelector((state:any) => state.user.isAuth);
    return (
        <>
            <HeaderAbove />
            <Header />
            <Container className="main-cont">
                { stateIsAuth ? <Outlet /> : <Navigate to="/" />}
            </Container>
            <Footer />
            {/* <LoginPage />
            <RegPage /> */}
        </>
    );
};

export default LayoutUser;
