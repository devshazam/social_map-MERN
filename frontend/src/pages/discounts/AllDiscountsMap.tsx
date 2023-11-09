
import React, { useState,  useRef, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";



const AllDiscountsMap = () => {
    const [map, setMap] = useState<any>(null);
    const [discounts, setDiscounts] = useState("");


    useEffect(() => {
        if(!map) return;


    }, [map])

    return (
        <>
            <Row className="mb-5">
                            <YMaps
                                query={{ apikey: '7176836c-97ba-4255-ae13-340eea0ffce0', load: 'util.bounds' }}>
                                <section className="map container" >
                                        <Map
                                            defaultState={{
                                                center: [48.707067, 44.516975],
                                                zoom: 11
                                            }}
                                            // state={{bounds: [[55.70097908883712, 37.60749234936649], [55.71551741036628, 37.63736142895632]]}}
                                            width="100%"
                                            height={600}
                                            modules={['geoObject.addon.balloon', 'geoObject.addon.hint', "geolocation", "geocode"]}

                                            onBoundsChange={(ymaps:any) => {
                                                setMap(ymaps)
                                            }}

                                            //
                                            // onBoundsChange={(ymaps:any) => {setQaz(ymaps._bounds)}}
                                            // instanceRef={(ymaps:any):void => onLoad(ymaps)}
                                            // onLoad={(ymaps:any) => {setQaz(ymaps._bounds)}}
                                            >
                                        </Map>
                                </section>
                            </YMaps>
            </Row>
        </>
    );
};

export default AllDiscountsMap;
