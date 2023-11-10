
import React, { useState,  useRef, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";


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

const AllDiscountsMap = () => {
    const mapRef = useRef<any>();
    const [map, setMap] = useState<any>(null);
    const [drawerFilter, setDrawerFilter] = useState<any>(false);
    
    console.log(map, 1212)

    const refreshData = () => {
       if(mapRef.current && mapRef.current._bounds) {
         setMap(mapRef.current._bounds);
        }
      };

      const toggleDrawer = (open: any):void => {
        setDrawerFilter(open);
      };

      
    useEffect(() => {

    category, discount, cost, latitude, longitude 
    }, [stateImg, stateMap, stateCommon, discountObject])

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
                                                zoom: 11
                                            }}
                                            // state={{bounds: [[55.70097908883712, 37.60749234936649], [55.71551741036628, 37.63736142895632]]}}
                                            width="100%"
                                            height={600}
                                            modules={['geoObject.addon.balloon', 'geoObject.addon.hint', "geolocation", "geocode"]}

                                            onBoundsChange={(ymaps:any) => {
                                                setMap(ymaps)
                                            }}
                                            // onBoundsChange={(ymaps:any) => getGeoLocation(ymaps)}
                                            //
                                            // onBoundsChange={(ymaps:any) => {setQaz(ymaps._bounds)}}
                                            // instanceRef={(ymaps:any):void => onLoad(ymaps)}
                                            // onLoad={(ymaps:any) => {setQaz(ymaps)}}
                                            instanceRef={mapRef}
                                            onLoad={refreshData}
                                            >
                                        </Map>
                                </section>
                            </YMaps>



                        
          
          <Drawer
            anchor={'left'}
            open={drawerFilter}
            onClose={() => toggleDrawer(false)}
          >
            {/* {list(anchor)} */}
            <Box
                // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
                onClick={() => toggleDrawer(false)}
                onKeyDown={() => toggleDrawer(false)}
                >
                <List>
                    <ListItem key={'text'} disablePadding>
                        <ListItemButton>
                        <ListItemIcon>
                            {'index'}
                        </ListItemIcon>
                        <ListItemText primary={'text'} />
                        </ListItemButton>
                    </ListItem>
                </List>

                </Box>
          </Drawer>
     
            </Row>
        </>
    );
};

export default AllDiscountsMap;
