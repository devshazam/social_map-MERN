import React from "react";

import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Col from "react-bootstrap/Col";
import { TextField } from "@mui/material";
import { fetchYandexAddress } from "../../../../api/discountAPI";
import Button from "@mui/material/Button";
// import { useDispatch } from "react-redux";
import './MapChoiceComp.scss';
import {useDispatch} from "react-redux";

const MapChoiceComp = (props: any) => {
    const dispatch = useDispatch();
    // const [addressString, setAddressString] = useState<string>("Волгоград, ");
    // const [coordinats, setCoordinats] = useState<any>([]);

    let callFetchYandexAddress = (): void => {
        if (!props.createObject.address) return;
        fetchYandexAddress({ address: props.createObject.address })
            .then((data: any) => {
                if(!data.result){
                    dispatch({type: "ALERT", payload: {modal: true, variant: 'warning', text: `Адрес не найден!`}});
                    return;
                }
                    props.changeCreateObject({address: data.result, latitude: data.latitude, longitude: data.longitude});
            })
            .catch((error: any) => {
                if (error.response && error.response.data) {
                    dispatch({type: "ALERT", payload: {modal: true, variant: 'warning', text: `${error.response.data.message}`}});
                } 
            });
    };

    // ==========================================================================================================

    return (
        <>
            <Col xs={12}  md={{ span: 6, offset: 3 }} className="mb-2">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 1}}
                    error={Boolean(!props.createObject.latitude && !props.createObject.longitude && props.flag === 0)}
                    defaultValue="Волгоград, "
                    // onChange={(e) => setAddressString(e.target.value)}
                    onChange={(e:any) => props.changeCreateObject({address: e.target.value})}
                    label="Введите точный адрес в Волгограде*:"
                    // className=""
                />
                <Button color='primary' variant="contained" onClick={callFetchYandexAddress} className="click_bottom mb-2">
                    Нажмите для установки адреса на карте*
                </Button>
            {/* </Col>
            <Col xs={12} md={6} style={{marginBottom: '15px'}}> */}
                <div className="map-wrapper">
                    <YMaps query={{ apikey: process.env.REACT_APP_YANDEX_KEY }} >
                        {/* apikey - https://reactjsexample.com/yandex-maps-api-bindings-for-react/ */}
                        <section className="map container">
                            { (props.createObject.latitude && props.createObject.longitude) ? (
                                <Map
                                    state={{
                                        center: [props.createObject.latitude, props.createObject.longitude], // координаты центра карты 48.512741, 44.535905
                                        zoom: 13,
                                    }}
                                    width="100%"
                                    height={300}
                                    // включаем модули, отвечающие за всплывающие окна над геообъектами
                                    // modules={[
                                    //     "geoObject.addon.balloon",
                                    //     "geoObject.addon.hint",
                                    // ]}
                                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint', "geolocation", "geocode"]}
                                >
                                    <Placemark
                                        geometry={[props.createObject.latitude, props.createObject.longitude]}
                                        options={{
                                            preset: "islands#oliveStretchyIcon", // список темплейтов на сайте яндекса
                                            iconColor: "red", // цвет иконки
                                        }}
                                        properties={{
                                            iconContent: "Правильно?!", // пару символов помещается
                                            hintContent: `<em>кликни меня</em>`,
                                            balloonContent: `<div class="my-balloon">
                                                            <p class="my-balloon-one">
                                                                Если не правильно, введите адрес еще раз! <br>Если Ваш адрес не найден, введите адрес по близости!
                                                            </p>
                                                            <p class="my-balloon-two">
                                                                Если правильно, сделайте "следующий шаг"!
                                                            </p>
                                                            </div>`,
                                        }}
                                    />
                                </Map>
                            ) : (
                                <Map
                                    state={{
                                        center: [48.707067, 44.516975],
                                        zoom: 10,
                                    }}
                                    width="100%"
                                    height={300}
                                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint', "geolocation", "geocode"]}
                                ></Map>
                            )}
                        </section>
                    </YMaps>
                </div>
            </Col>

            
        </>
    );
};

export default MapChoiceComp;
