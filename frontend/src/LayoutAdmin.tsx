import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";


const LayoutAdmin = () => {

    return (
        <>
            <Header />
            <Container className="main-cont">
                {/* {user.isAuth ? <Outlet /> : <Navigate to="/" />} */}
                <Outlet /> 
            </Container>
            <Footer />
        </>
    );
};

export default LayoutAdmin;

