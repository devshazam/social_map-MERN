import React from "react";

import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Footer from "./components/Footer";
import HeaderAbove from "./components/HeaderAbove";


const Layout: React.FC = () => {
    return (
        <>
            <HeaderAbove />
            <Header />
            <Container className="main-cont">
                <Outlet />
            </Container>
            <Footer />
 
        </>
    );
};

export default Layout;