
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

const AllMap = () => {
    const { adCategory } = useParams();

    const mapRef = useRef<any>();
    
    const [map, setMap] = useState<any>(null);
    const [zoom, setZoom] = useState<any>(16);

    const [drawerFilter, setDrawerFilter] = useState<any>(false);

    const [discountList, setDiscountList] = useState<any>(null);
    const [arrayCoordinates, setArrayCoordinates] = useState<any>([]);
    
    const [mainObject, setMainObject] = useState<any>({});

    const refreshData = () => {
       if(mapRef.current && mapRef.current._bounds) {
         setMap(mapRef.current._bounds);
        }
      };

    useEffect(() => {
        if(!adCategory || !map) return;
        if( zoom < 12) {
            setTimeout(function() {setZoom(13) }, 1000); 
            return;}

        fetchDiscountByMap({ ...mainObject, adCategory, xLatitude: map[0][0], xLongitude: map[0][1], yLatitude: map[1][0], yLongitude: map[1][1] }).then((data) => {
            let mid2:any = []
            data.map((item:any) => {mid2 = [...mid2, [item.latitude, item.longitude]]})
            setArrayCoordinates(mid2)
            setDiscountList(data)
        })
        .catch((error:any) => {
            if (error.response && error.response.data) {
                alert(
                    `${error.response.data.message}${error.response.status}`
                );
            } else {
                console.log("dev", error);
                // alert("Ошибка 138 - Обратитесь к администратору!");
            }
        });
    }, [map, JSON.stringify(mainObject)])

    const toggleDrawer = (open: any):void => {
      setDrawerFilter(open);
    };

    return (
        <>
            <Row className="mb-5">
                { (adCategory === '1' || adCategory === '1') && <Button onClick={() => toggleDrawer(true)}>ОТКРЫТЬ ФИЛЬТРЫ</Button> }

                <div style={{position: 'relative'}}>
                    {zoom < 12 && <div style={{display: 'flex', position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', zIndex: '999'}}><p style={{fontSize: '50px', margin: 'auto', width: '80%', color: 'rgb(217 98 98 / 75%);', fontWeight: '100', textAlign: 'center' }}>Для появления объявлений увеличьте (приблизьте) карту!</p></div>}
                    <YMaps
                        query={{ apikey: process.env.REACT_APP_YANDEX_KEY }}>
                        <section className="map container" >
                                <Map
                                    defaultState={{
                                        // center: [48.707067, 44.516975],
                                        center: [48.512273, 44.555203],
                                        zoom: 14
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
                                                    <span key={index}>
                                                        { adCategory === '1' && <DiscountsMapComp  mainDataObject={{item, arrayCoordinates, index}} /> }
                                                        { adCategory === '2' && <CharityMap mainDataObject={{item, arrayCoordinates, index}} /> }
                                                        { adCategory === '3' && <EventMap mainDataObject={{item, arrayCoordinates, index}} /> }
                                                        { adCategory === '4' && <AvitoMap mainDataObject={{item, arrayCoordinates, index}} /> }
                                                    </span>
                                                );
                                            })
                                        }
                                </Map>
                        </section>
                    </YMaps>
                </div>
                <br></br>
                { adCategory === '1' && <p>* Обозначение цветов маркеров: <span style={{color:'white', backgroundColor: 'red'}}>Красный:</span> срок объявления до 7 дней; <span style={{color:'white', backgroundColor: 'blue'}}>Синий:</span> срок объявления более 7 дней!</p>}
                { adCategory === '2' && <p>* Обозначение цветов маркеров: <span style={{color:'white', backgroundColor: 'red'}}>Красный:</span> объявление подано компанией; <span style={{color:'white', backgroundColor: 'blue'}}>Синий:</span> объявление подано персоной!</p>}
                { adCategory === '3' && <p>* Обозначение цветов маркеров: <span style={{color:'white', backgroundColor: 'red'}}>Красный:</span> Мероприятие уже идет; <span style={{color:'white', backgroundColor: 'blue'}}>Синий:</span> мероприятие начнется через время!</p>}
                { adCategory === '4' && <p>* Обозначение цветов маркеров: <span style={{color:'white', backgroundColor: 'red'}}>Красный:</span> срок объявления до 2 дней; <span style={{color:'white', backgroundColor: 'blue'}}>Синий:</span> срок объявления более 2 дней!</p>}
            </Row>
            
            
            <Drawer
            anchor={'left'}
            open={drawerFilter}
            onClose={() => toggleDrawer(false)}
          >
            <br /><p style={{margin: '15px'}}><b>Фильтры категорий поиска: </b></p>

                    {adCategory === '1' &&
                        <FormControl fullWidth >
                        <InputLabel  >Категория скидки:</InputLabel>
                        <Select
                            onChange={(e: any) => setMainObject({...mainObject, discountCategory: e.target.value})}

                        >
                            <MenuItem key={0} value={0}>Все категории</MenuItem>
                            { 
                                globalParamsObject.discounts.discountsCategory.map((item:any, index:any) => {
                                    return(
                                        <MenuItem key={index + 1} value={index + 1}>{item}</MenuItem>
                                    )
                                })
                            }

                        </Select>
                    </FormControl>}
                    
                    {adCategory === '4' && 
                    <FormControl fullWidth >
                        <InputLabel  >Категория авито:</InputLabel>
                        <Select
                            onChange={(e: any) => setMainObject({...mainObject, avitoCategory: e.target.value})}
                        >
                            <MenuItem key={0} value={0}>Все категории</MenuItem>
                            { 
                                globalParamsObject.avito.avitoCategory.map((item:any, index:any) => {
                                    return(
                                        <MenuItem key={index + 1} value={index + 1}>{item}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    }
          </Drawer>
        </>
    );
};

export default AllMap;
