import React, { useState, useEffect }from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import {Autocomplete, TextField} from "@mui/material";
import Divider from '@mui/material/Divider';
import { createDiscount } from "../../api/discountAPI";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {check} from "../../api/userAPI";

const CreateDiscount = () => {
    // const [orderNumber, setOrderNumber] = useState([]);
    const [addressString, setAddressString] = useState('Волгоград, ');
    const [searchLocations, setSearchLocations] = useState(['Волгоград, проспект Героев Сталинграда, 50 А']);
    const [coordinats, setCoordinats] = useState([48.512971, 44.543728]);
    const [discountObject, setDiscountObject] = useState({name: '', description: '', cost: '', costOld: '', discount: '', category: ''});
    const discountObjectArray:any[] = [['name', 'Название'], ['description', 'Описание'], ['cost', 'Цена'], ['costOld', 'Старая цена']];
    const [imageOne, setImageOne] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>('');

    console.log(imageOne)
    console.log(discountObject)
    let callcreateDiscount = ():void => {

        if(!addressString) return;

        createDiscount({address: addressString})
            .then((data: any) => {
                setSearchLocations(data.response.GeoObjectCollection.featureMember.map((elem: any )=> { return elem.GeoObject.metaDataProperty.GeocoderMetaData.text}));
                setCoordinats(data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse())
            })
            .catch((error: any) => {
                if (error.response.data) {
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
        let img: any = document.querySelector("#img");
        console.log(img.clientHeight)
    }, [imageUrl])

    let asd = (event:any):void =>{
        if (event.target.files && event.target.files[0]) {
            setImageUrl(URL.createObjectURL(event.target.files[0]));
            setImageOne(event.target.files[0])

        }
    }
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("description", description);
    // formData.append("group", group);
    // formData.append("image", image);
    // formData.append("price", `${Math.ceil(+price)}`);
    // formData.append("priceImg", `${Math.ceil(+priceImg)}`);
    // formData.append("userId", `${user.user.id}`);
    // formData.append("artikul", artikul);
    // formData.append("barcode", barcode);


    return (
        <>
            <Row className="mb-3">

                <Col xs={12} md={{ span: 6, order: 2 }}>
            <YMaps>
                <section className="map container">
                    <Map
                        state={{
                            center: coordinats, // координаты центра карты 48.512741, 44.535905
                            zoom: 12,
                        }}
                        width="100%"
                        height={300}
                        // включаем модули, отвечающие за всплывающие окна над геообъектами
                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    >
                        {/* Рисуем метку */}
                        <Placemark
                            geometry={coordinats}
                            options={{
                                preset: 'islands#oliveStretchyIcon', // список темплейтов на сайте яндекса
                                iconColor: 'green', // цвет иконки
                            }}
                            properties={{
                                iconContent: {}, // пару символов помещается
                                hintContent: '<em>кликни меня</em>',
                                balloonContent: `<div class="my-balloon">
                                      <h4>КофеМаг</h4>
                                      <p>
                                        Скидка 50% на кофе
                                      </p>
                                      <a href="#">Смотреть магазин</a>
                                    </div>`,
                            }}
                        />


                    </Map>
                </section>
            </YMaps>

                    <img id="img" alt="preview image" src={imageUrl} style={{width: '50%', margin: '30px'}}/>
                </Col>


                <Col xs={12} md={{ span: 6, order: 1 }}>
                        <h6>Шаг №1: Заполните адрес и сопоставьте его с картой</h6>
                        <Autocomplete sx={{ p: 1}}
                            id="free-solo-demo"
                            fullWidth
                            freeSolo
                                      value={addressString}
                            options={searchLocations.map((option) => option)}
                            renderInput={(params) => <TextField {...params}

                                                                onChange={(e) => setAddressString(e.target.value)}
                                                                label="Введите адрес" />}
                        />
                        <Button variant="contained"  sx={{ p: 1}}
                                onClick={callcreateDiscount}>Найти</Button>

                    <hr/>
                        <h6>Шаг №2: Заполните хар-ки</h6>

                    {discountObjectArray.map((elem) => (
                            <TextField sx={{ p: 1, width: { sm: 'none', md: '50%' } }} id="outlined-basic" label={elem[1]} variant="outlined" fullWidth
                                       onChange={(e) => setDiscountObject({...discountObject, [elem[0]]: e.target.value})}/>
                        )
                    )
                    }


                    <FormControl fullWidth sx={{ p: 1, width: { sm: 'none', md: '50%' } }}>
                        <InputLabel id="demo-simple-select-label">Скидка</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={discountObject.discount}
                            label="Age"
                            onChange={(e: any) => setDiscountObject({...discountObject, discount: e.target.value})}
                        >
                            <MenuItem value={5}>5% скидка</MenuItem>
                            <MenuItem value={10}>10% скидка</MenuItem>
                            <MenuItem value={15}>15% скидка</MenuItem>
                            <MenuItem value={20}>20% скидка</MenuItem>
                            <MenuItem value={25}>25% скидка</MenuItem>
                            <MenuItem value={30}>30% скидка</MenuItem>
                            <MenuItem value={35}>35% скидка</MenuItem>
                            <MenuItem value={40}>40% скидка</MenuItem>
                            <MenuItem value={45}>45% скидка</MenuItem>
                            <MenuItem value={50}>50% скидка</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ p: 1, width: { sm: 'none', md: '50%' } }}>
                        <InputLabel id="demo-simple-select-label">Категория товаров и услуг</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={discountObject.category}
                            label="Age"
                            onChange={(e: any) => setDiscountObject({...discountObject, category: e.target.value})}
                        >
                            <MenuItem value={5}>Красота и здоровье</MenuItem>
                            <MenuItem value={10}>Все для животных</MenuItem>
                            <MenuItem value={15}>Одежда и обувь</MenuItem>
                            <MenuItem value={20}>Товары для детей</MenuItem>
                            <MenuItem value={25}>Автомобиль</MenuItem>
                            <MenuItem value={30}>Электроника</MenuItem>
                            <MenuItem value={35}>Дом и дача</MenuItem>
                            <MenuItem value={40}>Услуги</MenuItem>
                            <MenuItem value={45}>Хобби и отдых</MenuItem>
                            <MenuItem value={50}>50% скидка</MenuItem>
                        </Select>
                    </FormControl>

                    <hr/>
                    <h6>Шаг №3: Загрузите картинку (600х600 пикселей, до 1 Мбайт)</h6>

                    <Button
                        variant="contained"
                        component="label"
                    >
                       Загрузить файл
                        <input accept="image/*"
                            type="file"
                            hidden
                               onChange={asd}
                        />
                    </Button>


                    {/*<TextField sx={{ p: 1, width: { sm: 'none', md: '50%' } }} id="outlined-basic" label={elem[1]} variant="outlined" fullWidth*/}
                    {/*           onChange={(e) => setDiscountObject({...discountObject, [elem[0]]: e.target.value})}/>*/}

                </Col>


            </Row>
        </>
    );
};

export default CreateDiscount;


// name: {  type: String, required: true },
// description: {  type: String, required: true },
// cost: { type: String, required: true },
// cost_old: { type: String, required: true },
// discount: { type: Number, required: true },
// address: { type: String, required: true },
// coordinates: { type: [String], required: true },
// image: { type: String, required: true },
// category: { type: String, required: true },