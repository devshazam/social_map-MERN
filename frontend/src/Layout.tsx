import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Footer from "./components/Footer";
import HeaderAbove from "./components/HeaderAbove";
import LoginPage from "./components/modal/LoginPage";
import RegPage from "./components/modal/RegPage";
// import BanSite from "./components/modal/BanSite.jьв";


export default function Layout() {
    return (
        <>
            <HeaderAbove />
            <Header />
            <Container className="main-cont">
                <Outlet />
            </Container>
            <Footer />
            {/* <LoginPage />
            <RegPage /> */}
            {/* <BanSite /> */}
        </>
    );
}
