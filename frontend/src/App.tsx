
import React, {useContext, useEffect, useState} from 'react';
// import {Context} from "./index";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import Spinner from "react-bootstrap/Spinner";

import Layout from "./Layout"
import LayoutAdmin from "./LayoutAdmin"
import Home from "./pages/main/Home"
import Empty from "./pages/main/Empty"
import Test from "./pages/main/Test"
import CreateDiscount from "./pages/discounts/CreateDiscount";
import {useDispatch, useSelector} from "react-redux";




const App: React.FC = () => {

    const state = useSelector((state:any) => state.cash.cash);
    console.log(state)
  // if (loading) {
  //   return <div id="mail-spinner"><Spinner animation="border" /></div>;
  // }

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/test" element={<Test />} />
              <Route path="/*" element={<Empty />} />
              <Route path="/discounts/create" element={<CreateDiscount />} />
          </Route>
          {/* <Route path="/admin/" element={<LayoutAdmin />}>
              <Route index element={<AllOrdersAdmin />} />
              <Route path="/admin/base-of-orders" element={<BaseOfOrders />} />
          </Route> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
