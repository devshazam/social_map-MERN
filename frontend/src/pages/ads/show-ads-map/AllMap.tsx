
import React, { useState,  useRef, useEffect } from "react";
import { useParams , useSearchParams} from "react-router-dom";

import Row from "react-bootstrap/Row";
import {Map, YMaps} from "@pbe/react-yandex-maps";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import DiscountsMapComp from './components/DiscountsMapComp';
import CharityMap from './components/CharityMap';
import EventMap from './components/EventMap';
import AvitoMap from './components/AvitoMap';

import { fetchDiscountByMap }from '../../../api/discountAPI';

import globalParamsObject from '../../../parameters/mainAppParameterObject';

const AllDiscountsMap = () => {
    const { adCategory } = useParams();

    const mapRef = useRef<any>();
    
    let [searchParams, setSearchParams] = useSearchParams()
    const avitoCategory =  searchParams.get("avitoCategory") || '5';

    const [map, setMap] = useState<any>(null);
    const [zoom, setZoom] = useState<any>(16);

    const [drawerFilter, setDrawerFilter] = useState<any>(false);

    const [discountList, setDiscountList] = useState<any>(null);
    const [allObject, setAllObject] = useState<any>({avitoCategory});
    const [arrayCoordinates, setArrayCoordinates] = useState<any>([]);


    const refreshData = () => {
       if(mapRef.current && mapRef.current._bounds) {
         setMap(mapRef.current._bounds);
        }
      };

    useEffect(() => {
        if(!map) return;
        if( zoom < 12) {
            setTimeout(function() {setZoom(13) }, 1000); 
            return;}

        fetchDiscountByMap({ ...allObject, adCategory, xLatitude: map[0][0], xLongitude: map[0][1], yLatitude: map[1][0], yLongitude: map[1][1] }).then((data) => {
            let mid2:any = []
            data.map((item:any) => {mid2 = [...mid2, [item.latitude, item.longitude]]})
            setArrayCoordinates(mid2)
            setDiscountList(data)
        })
        .catch((error:any) => {
            if (error.response) {
                alert(
                    `${error.response.data.message}${error.response.status}`
                );
            } else {
                console.log("dev", error);
                // alert("Ошибка 138 - Обратитесь к администратору!");
            }
        });
    }, [map])

    const toggleDrawer = (open: any):void => {
      setDrawerFilter(open);
    };

    return (
        <>
            <Row className="mb-5">
                <Button onClick={() => toggleDrawer(true)}>ОТКРЫТЬ ФИЛЬТРЫ</Button>
                <div style={{position: 'relative'}}>
                    {zoom < 12 && <div style={{display: 'flex', position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', zIndex: '999'}}><p style={{fontSize: '50px', margin: 'auto', width: '80%', color: 'rgb(217 98 98 / 75%);', fontWeight: '100', textAlign: 'center' }}>Для появления объявлений увеличьте (приблизьте) карту!</p></div>}
                    <YMaps
                        query={{ apikey: '7176836c-97ba-4255-ae13-340eea0ffce0' }}>
                        <section className="map container" >
                                <Map
                                    defaultState={{
                                        // center: [48.707067, 44.516975],
                                        center: [48.514045, 44.527467],
                                        zoom: 16
                                    }}
                                    width="100%"
                                    height={600}
                                    modules={['geoObject.addon.balloon', 'geoObject.addon.hint', "geolocation", "geocode"]}
                                    onBoundsChange={(ymaps:any) => {
                                        setMap(ymaps.originalEvent.newBounds);
                                        setZoom(ymaps.originalEvent.newZoom);
                                    }}
                                    instanceRef={mapRef}
                                    onLoad={refreshData}
                                        >
                                        { discountList &&
                                            discountList.map((item: any, index:any) => {
                                                return(
                                                    <>
                                                        { adCategory === '1' && <DiscountsMapComp key={item._id} mainDataObject={{item, arrayCoordinates, index}} /> }
                                                        { adCategory === '2' && <CharityMap key={item._id} mainDataObject={{item, arrayCoordinates, index}} /> }
                                                        { adCategory === '3' && <EventMap key={item._id} mainDataObject={{item, arrayCoordinates, index}} /> }
                                                        { adCategory === '4' && <AvitoMap key={item._id} mainDataObject={{item, arrayCoordinates, index}} /> }
                                                    </>
                                                );
                                            })
                                        }
                                </Map>
                        </section>
                    </YMaps>
                </div>
          <Drawer
            anchor={'left'}
            open={drawerFilter}
            onClose={() => toggleDrawer(false)}
          >
            <br /><p>Фильтры: </p>

                    {adCategory === '1' &&
                        <FormControl fullWidth >
                        <InputLabel  >Категория скидки:</InputLabel>
                        <Select
                            value={allObject.discountCategory}
                            onChange={(e: any) => setAllObject({...allObject, discountCategory: e.target.value})}
                        >
                            { 
                                globalParamsObject.discounts.discountsCategory.map((item:any, index:any) => {
                                    return(
                                        <MenuItem key={index} value={index + 1}>{item}</MenuItem>
                                    )
                                })
                            }

                        </Select>
                    </FormControl>}
                    
                    {adCategory === '4' && 
                    <FormControl fullWidth >
                        <InputLabel  >Категория авито:</InputLabel>
                        <Select
                            value={allObject.avitoCategory}
                            onChange={(e: any) => setAllObject({...allObject, avitoCategory: e.target.value})}
                        >
                            { 
                                globalParamsObject.avito.avitoCategory.map((item:any, index:any) => {
                                    return(
                                        <MenuItem key={index} value={index + 1}>{item}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    }
          </Drawer>
     
            </Row>
        </>
    );
};

export default AllDiscountsMap;
