import React, { useContext, useEffect, useState } from "react";
// import {Context} from "./index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";

import Layout from "./Layout";
import LayoutUser from "./LayoutUser";
import LayoutCompany from "./LayoutCompany";
import Home from "./pages/main/Home";
import Empty from "./pages/main/Empty";
import Test from "./pages/main/Test";
import Contacts from "./pages/main/Contacts";
import { useDispatch } from "react-redux";
import { check } from "../src/api/userAPI";

import AllAds from "./pages/ads/show-ads-list/AllAds";
import AllMap from "./pages/ads/show-ads-map/AllMap";
// import CreateAd from "./pages/ads/create-ad/CreateAd";
import CreateAdMidlware from "./pages/ads/create-ad/CreateAdMidlware";
import AdView from "./pages/ads/Show-one-ad/OneAd";
import UserAdsList from './pages/user-admin/UserAdsList'
import UserUpdateOne from './pages/user-admin/UserUpdateOne'
import LoginReg from './pages/login-reg/LoginReg'
import CompanyReg from './pages/login-reg/CompanyReg'

import UserPrivateCab from './pages/user-admin/UserPrivateCab';
// import UserChangeAddress from './pages/user-admin/UserChangeAddress';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        check()
            .then((data) => {
                console.log('dev', data)
                if (data) {
                    dispatch({ type: "AUTH", payload: true });
                    dispatch({ type: "USER", payload: data });
                }
            })
            .catch((error) => {
                // if(error.response && error.response.data){
                //     alert(`${error.response.data.message} - (${error.response.status})`);
                // }else{
                //     console.log('dev', error);
                //     alert('Ошибка 103 - Обратитесь к администратору!');
                // }
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div id="mail-spinner">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/test" element={<Test />} />
                        <Route path="/*" element={<Empty />} />
                        <Route path="/ads/:adCategory" element={<AllAds />} />
                        <Route path="/ads-map/:adCategory" element={<AllMap />} />
                        <Route path="/ad-view/:adId" element={<AdView />} />

                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/login-registration" element={<LoginReg />} />
                        <Route path="/company-registration" element={<CompanyReg />} />
                    </Route>

                        <Route path="/user/" element={<LayoutUser />}>
                            <Route path="/user/ads/create-ad/:adCategory" element={<CreateAdMidlware />} />
                            <Route path="/user/user-ads-list" element={<UserAdsList />} />
                            <Route path="/user/user-update-one/:adId" element={<UserUpdateOne />} />
                            <Route path="/user/private-cab" element={<UserPrivateCab />} />
                            {/* <Route path="/user/user-change-address" element={<UserChangeAddress />} /> */}
                        </Route>

                            <Route path="/company/" element={<LayoutCompany />}>
                                <Route path="/company/ads/create-ad/:adCategory"  element={<CreateAdMidlware />} />
                            </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
