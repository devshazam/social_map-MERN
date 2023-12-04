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
import { useDispatch, useSelector } from "react-redux";
import { check } from "../src/api/userAPI";

import AllAds from "./pages/ads/show-ads-list/AllAds";
import AllMap from "./pages/ads/show-ads-map/AllMap";
import CreateAd from "./pages/ads/create-ad/CreateAd";
import AdView from "./pages/ads/Show-one-ad/OneAd";

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        check()
            .then((data) => {
                // console.log('dev', data)
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
                        <Route
                            path="/ads-map/:adCategory"
                            element={<AllMap />}
                        />
                        <Route path="/ad-view/:adId" element={<AdView />} />


                        <Route path="/contacts" element={<Contacts />} />
                    </Route>
                    <Route path="/user/" element={<LayoutUser />}>
                        <Route
                            path="/user/ads/create-ad/:adCategory"
                            element={<CreateAd />}
                        />
                        {/* <Route index element={<AllOrdersAdmin />} />
              <Route path="/admin/base-of-orders" element={<BaseOfOrders />} /> */}
                    </Route>
                    <Route path="/company/" element={<LayoutCompany />}>
                        <Route
                            path="/company/ads/create-ad/:adCategory"
                            element={<CreateAd />}
                        />
                        {/* <Route index element={<AllOrdersAdmin />} />
              <Route path="/admin/base-of-orders" element={<BaseOfOrders />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
