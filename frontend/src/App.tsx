import React, { useEffect, useState } from "react";
// import {Context} from "./index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import Spinner from "react-bootstrap/Spinner";

import Layout from "./Layout";
import LayoutUser from "./LayoutUser";
// import LayoutCompany from "./LayoutCompany";
import Home from "./pages/main/Home";
import Empty from "./pages/main/Empty";
import Oferta from "./pages/main/Oferta";
import Conditions from "./pages/main/Conditions";
import Test from "./pages/main/Test";
import Contacts from "./pages/main/Contacts";
import { useDispatch } from "react-redux";
import { check } from "../src/api/userAPI";

import AllAds from "./pages/ads/list/AllAds";
import AllMap from "./pages/ads/map/AllMap";
import CreateAdMidlware from "./pages/ads/create/CreateAdMidlware";
import AdView from "./pages/ads/one/OneAd";
import UserAdsList from './pages/user/UserAdsList'
import UserUpdateOne from './pages/user/UserUpdateOne'
import LoginReg from './pages/login-reg/LoginReg'
import CompanyReg from './pages/login-reg/CompanyReg'
// import AdvertMidlware from './pages/adverts/create/AdvertMidlware';


import AlertPage from './components/AlertPage';
import Soon from "./pages/main/Soon";
import UserPrivateCab from './pages/user/UserPrivateCab';
import './style.scss';

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
                console.log('dev', error);
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
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/*" element={<Empty />} />
                        <Route path="/404" element={<Empty />} />
                        <Route path="/ads/:adCategory" element={<AllAds />} />
                        <Route path="/ads-map/:adCategory" element={<AllMap />} />
                        <Route path="/ad-view/:adId" element={<AdView />} />
                        <Route path="/ad-view/charity" element={<AdView />} />

                        <Route path="/contacts" element={<Contacts />} />
                        <Route path="/soon" element={<Soon />} />
                        <Route path="/oferta" element={<Oferta />} />
                        <Route path="/conditions" element={<Conditions />} />
                        <Route path="/login-registration" element={<LoginReg />} />
                        <Route path="/company-registration" element={<CompanyReg />} />

                        <Route path="/test" element={<Test />} />
                    </Route>
                        <Route path="/user/" element={<LayoutUser />}>
                            <Route path="/user/ads/create-ad/:adCategory" element={<CreateAdMidlware />} />
                            {/* <Route path="/user/ads/create-advert" element={<AdvertMidlware />} /> */}
                            <Route path="/user/user-ads-list" element={<UserAdsList />} />
                            <Route path="/user/user-update-one/:adId" element={<UserUpdateOne />} />
                            <Route path="/user/private-cab" element={<UserPrivateCab />} />
                            {/* <Route path="/user/user-change-address" element={<UserChangeAddress />} /> */}
                        </Route>

                            {/* <Route path="/company/" element={<LayoutCompany />}>
                                <Route path="/company/ads/create/:adCategory"  element={<CreateAdMidlware />} />
                            </Route> */}
                </Routes>
            </BrowserRouter>
            <AlertPage />
        </div>
    );
};

export default App;
