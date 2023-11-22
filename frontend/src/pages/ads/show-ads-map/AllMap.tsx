
import React, { useState,  useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';


import DiscountsMapComp from './components/DiscountsMapComp'
import { fetchDiscountByMap }from '../../../api/discountAPI'

const AllDiscountsMap = () => {
    const { adCategory } = useParams();

    const mapRef = useRef<any>();
    const [map, setMap] = useState<any>(null);
    const [drawerFilter, setDrawerFilter] = useState<any>(false);

    const [discountList, setDiscountList] = useState<any>(null);
    const [allObject, setAllObject] = useState<any>({});
    
    console.log(discountList)

    const refreshData = () => {
       if(mapRef.current && mapRef.current._bounds) {
         setMap(mapRef.current._bounds);
        }
      };

      const toggleDrawer = (open: any):void => {
        setDrawerFilter(open);
      };

      
    useEffect(() => {
        if(!map) {return;}
        fetchDiscountByMap({ ...allObject, adCategory, xLatitude: map[0][0], xLongitude: map[0][1], yLatitude: map[1][0], yLongitude: map[1][1] }).then((data) => {
            setDiscountList(data)
        })
        .catch((error:any) => {
            if (error.response.data) {
                alert(
                    `${error.response.data.message}${error.response.status}`
                );
            } else {
                console.log("dev", error);
                alert("Ошибка 138 - Обратитесь к администратору!");
            }
        });
        
    
    }, [map])

    return (
        <>
            <Row className="mb-5">
                <Button onClick={() => toggleDrawer(true)}>ОТКРЫТЬ ФИЛЬТРЫ</Button>
                            <YMaps
                                query={{ apikey: '7176836c-97ba-4255-ae13-340eea0ffce0', load: 'util.bounds' }}>
                                <section className="map container" >
                                        <Map
                                            defaultState={{
                                                // center: [48.707067, 44.516975],
                                                center: [48.514045, 44.527467],

                                                zoom: 16
                                            }}
                                            // state={{bounds: [[55.70097908883712, 37.60749234936649], [55.71551741036628, 37.63736142895632]]}}
                                            width="100%"
                                            height={600}
                                            modules={['geoObject.addon.balloon', 'geoObject.addon.hint', "geolocation", "geocode"]}

                                            onBoundsChange={(ymaps:any) => {
                                                setMap(ymaps.originalEvent.newBounds)
                                            }}
                                            // onBoundsChange={(ymaps:any) => getGeoLocation(ymaps)}
                                            //
                                            // onBoundsChange={(ymaps:any) => {setQaz(ymaps._bounds)}}
                                            // instanceRef={(ymaps:any):void => onLoad(ymaps)}
                                            // onLoad={(ymaps:any) => {setQaz(ymaps)}}
                                            instanceRef={mapRef}
                                            onLoad={refreshData}
                                             >
                            
                                                { discountList &&
                                                    
                                                    discountList.map((item: any) => {
                     
                                                        return(
                                                            <>
                                                                { adCategory === '1' && <DiscountsMapComp key={item._id} discountItem={item}/> }
                                                                {/* { adCategory === '2' && <DistrictForm /> }
                                                                { adCategory === '3' && <EventsForms /> } */}
                                                                {/* { adCategory === '4' && <AvitoForms /> } */}
                                                                {/* <Placemark key={item._id}
                                                                    geometry={[item.latitude, item.longitude]}
                                                                   
                                                                /> */}
                                                            </>
                                                        );
                                                    })
                                                }
                                        </Map>
                                </section>
                            </YMaps>



                        
          
          <Drawer
            anchor={'left'}
            open={drawerFilter}
            onClose={() => toggleDrawer(false)}
          >
            <p>Ghbdssssssssssssssssssssssssssssssssssstn</p>
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label" >Категория скидки:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={allObject.district}
                            label="Age"
                            onChange={(e: any) => setAllObject({...allObject, district: e.target.value})}
                        >
                            <MenuItem value={1}>Ворошиловский</MenuItem>
                            <MenuItem value={2}>Дзержинский</MenuItem>
                            <MenuItem value={3}>Кировский</MenuItem>
                            <MenuItem value={4}>Красноармейский</MenuItem>
                            <MenuItem value={5}>Краснооктябрьский</MenuItem>
                            <MenuItem value={6}>Советский</MenuItem>
                            <MenuItem value={7}>Тракторозаводский</MenuItem>
                            <MenuItem value={8}>Центральный</MenuItem>
                        </Select>
                    </FormControl>
                    {adCategory === '1' &&
                        <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label" >Категория скидки:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={allObject.discountCategory}
                            label="Age"
                            onChange={(e: any) => setAllObject({...allObject, discountCategory: e.target.value})}
                        >
                            <MenuItem value={1}>Красота и здоровье</MenuItem>
                            <MenuItem value={2}>Все для животных</MenuItem>
                            <MenuItem value={3}>Одежда и обувь</MenuItem>
                            <MenuItem value={4}>Товары для детей</MenuItem>
                            <MenuItem value={5}>Автомобиль</MenuItem>
                            <MenuItem value={6}>Электроника</MenuItem>
                            <MenuItem value={7}>Дом и дача</MenuItem>
                            <MenuItem value={8}>Услуги</MenuItem>
                            <MenuItem value={9}>Хобби и отдых</MenuItem>
                            <MenuItem value={10}>Продукты</MenuItem>
                        </Select>
                    </FormControl>}
                    
                    {adCategory === '4' && 
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label" >Категория авито:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={allObject.avitoCategory}
                            label="Age"
                            onChange={(e: any) => setAllObject({...allObject, avitoCategory: e.target.value})}
                        >
                            <MenuItem value={1}>Посуточная аренда</MenuItem>
                            <MenuItem value={2}>Длительная аренда</MenuItem>
                            <MenuItem value={3}>Продажа жилья</MenuItem>
                            <MenuItem value={4}>Продажа автомобилей</MenuItem>
                            <MenuItem value={5}>Личные вещи</MenuItem>
                            <MenuItem value={6}>Электроника</MenuItem>
                            <MenuItem value={7}>Работа</MenuItem>
                            <MenuItem value={8}>Услуги</MenuItem>
                        </Select>
                    </FormControl>
                    }
          </Drawer>
     
            </Row>
        </>
    );
};

export default AllDiscountsMap;
