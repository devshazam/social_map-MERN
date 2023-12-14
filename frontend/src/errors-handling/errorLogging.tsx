"use client";

import { ErrorInfo } from "react";
// import { ErrorBoundary } from "react-error-boundary";
import { recordErrorToLog } from "../api/discountAPI"
const logError = (error: Error, info: ErrorInfo) => {

    recordErrorToLog({ errorDesc: JSON.stringify(['Frontend', error.name, error.message, info.componentStack]) })
    .then((data: any) => {
      console.log(101, data)
    })
    .catch((error:any) => {
        if (error.response && error.response.data) {
            alert(
                `${error.response.data.message}${error.response.status}`
            );
        } else {
            console.log("dev", error);
            alert("Ошибка 156 - Обратитесь к администратору!");
        }
    });

  };


  function Fallback() {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    return (
      <div role="alert" style={{ margin: 'auto', textAlign: 'center', paddingTop: '10vh'}}>
        <p style={{width: '60%', fontSize: '25px', margin: 'auto',}} >Произошла непредвиденная ошибка, но в этом нет ничего страшного! <br /> Продолжайте использование других разделов сайта! <br /> <span style={{fontSize: '14px'}}>Администрация уже проинформирована и примет меры для ее устранения в ближайшее время!</span></p>
        <img src="/files/icons/attention.png" style={{width: '150px', margin: 'auto'}}></img>
      </div>
    );
  }

export {logError, Fallback}