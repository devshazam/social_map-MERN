import { FC, useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";

import { logReg } from "../../api/userAPI";

import RegPage from "../../components/modal/RegPage";
import  "./CompanyReg.scss";

declare global {
    interface Window {
        qwerty: any;
    }
}

const LoginReg: FC = () => {

    const [flag, setFlag] = useState<boolean>(false);

    const elementRef = useRef<any>(null)

    window.qwerty = (data: any): void => {
        console.log(101, data);
        logReg({...JSON.parse(data), role: "COMPANY"})
            .then((data: any) => {
                window.location.replace("/");
            })
            .catch((error: any) => {
                if (error.response && error.response.data) {
                    alert(
                        `${error.response.data.message}${error.response.status}`
                    );
                } else {
                    console.log("dev", error);
                    alert("Ошибка 111 - Обратитесь к администратору!");
                }
            });
    };

    useEffect(() => {

        if (!elementRef || !elementRef.current) return;
        const observer = new ResizeObserver((entries) => {
          // 👉 Do something when the element is resized
          entries.forEach(entry => {
            if(entry.contentRect.height === 0){
                setFlag(true)
            }else{
                setFlag(false)
            } 
            console.log(101, 'ResizeObserver', entry.contentRect.height)
          });
        });
    
        observer.observe(elementRef.current);
        return () => {
          // Cleanup the observer by unobserving all elements
          observer.disconnect();
        };
      }, [])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Регистрация компаний</title>
                <script
                    src="https://code.jquery.com/jquery-3.7.1.min.js"
                    integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
                    crossOrigin="anonymous"
                ></script>
                <script src="//ulogin.ru/js/ulogin.js"></script>
                <script src="/files/javascript/main.js"></script>
            </Helmet>

                <div className="wrapper-login-form">

                    <div className="login-form">
                        <h3 className="reg-company-title">Регистрация компаний</h3>
                        <p className="text-reg-company">(доступна регистрация через соц. сети)</p>
                        <RegPage role={"COMPANY"} />
                        <div 
                            ref={elementRef}
                            className="social-icons"
                            id="uLogin30465678"
                            data-ulogin="display=panel;fields=first_name,email;optional=phone,last_name,photo,bdate;lang=ru;providers=vkontakte,yandex,odnoklassniki,google,mailru,youtube;redirect_uri=http%3A%2F%2Fwww.davse.ru%2Flogin-registration;callback=preview"
                        ></div>
                        {flag && (
                            <p className="note-reg">
                                Для входа или регистрации через социальные сети - отключите
                                блокировщик рекламы в браузере (привер: Adblock
                                Plus)!
                            </p>
                        )}
                    </div>
                </div>
        </>
    );
};

export default LoginReg;
