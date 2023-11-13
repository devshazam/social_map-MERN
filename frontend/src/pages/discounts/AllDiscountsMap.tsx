
import React, { useState,  useRef, useEffect } from "react";
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
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import { fetchDiscountByMap }from '../../api/discountAPI'

const AllDiscountsMap = () => {
    const mapRef = useRef<any>();
    const [map, setMap] = useState<any>(null);
    const [drawerFilter, setDrawerFilter] = useState<any>(false);

    const [category, setCategory] = useState(2);
    const [discountList, setDiscountList] = useState<any>(null);
    
    const currentTime = new Date().getTime();
console.log(currentTime)
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
        fetchDiscountByMap({ category, xLatitude: map[0][0], xLongitude: map[0][1], yLatitude: map[1][0], yLongitude: map[1][1] }).then((data) => {
            setDiscountList(data)


        })
        
    
    }, [map])

    return (
        <>
            <Row className="mb-5">
                <Button onClick={() => toggleDrawer(true)}>{"anchor"}</Button>
                            <YMaps
                                query={{ apikey: '7176836c-97ba-4255-ae13-340eea0ffce0', load: 'util.bounds' }}>
                                <section className="map container" >
                                        <Map
                                            defaultState={{
                                                center: [48.707067, 44.516975],
                                                zoom: 10
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
                                                    
                                                    discountList.map((item: any, index:any) => {
                                                        let colorPoint;
                                                        if(Math.ceil((currentTime - item.currentTime) / 8.64e7) <= 2){
                                                            colorPoint = 'red'
                                                        }else{
                                                            colorPoint = 'grey'
                                                        }

                                                        return(
                                                    <Placemark
                                                            geometry={[item.latitude, item.longitude]}
                                                            options={{
                                                                preset: 'islands#oliveStretchyIcon', // список темплейтов на сайте яндекса
                                                                iconColor: colorPoint, // цвет иконки
                                                            }}
                                                            properties={{
                                                                iconContent: `${item.discount}%`, // пару символов помещается
                                                                hintContent: '<em>кликни меня</em>',
                                                                balloonContent: `<div class="my-balloon">
                                                                    <h4>${item.name}</h4>
                                                                    <p>
                                                                        Скидка ${item.discount}% на кофе
                                                                    </p>
                                                                    <a href="#">Смотреть магазин</a>
                                                                    </div>`,
                                                            }}
                                                        />);
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
                    <FormControl fullWidth >
                        <InputLabel id="demo-simple-select-label" >Категория скидки:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Age"
                            onChange={(e:any) => setCategory(e.target.value)}
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
                    </FormControl>
          </Drawer>
     
            </Row>
        </>
    );
};

export default AllDiscountsMap;
