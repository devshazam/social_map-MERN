import React, { useState, useEffect }from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import {Autocomplete, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {check} from "../../api/userAPI";
import Resizer from "react-image-file-resizer";

import MapChoice from "../../components/create/MapChoice";
const CreateDiscount = () => {
    // const [orderNumber, setOrderNumber] = useState([]);
    const [addressString, setAddressString] = useState('Волгоград, ');
    const [searchLocations, setSearchLocations] = useState(['Волгоград, проспект Героев Сталинграда, 50 А']);
    const [coordinats, setCoordinats] = useState([48.512971, 44.543728]);
    const [discountObject, setDiscountObject] = useState({name: '', description: '', cost: '', costOld: '', discount: '', category: ''});
    const discountObjectArray:any[] = [['name', 'Название'], ['description', 'Описание'], ['cost', 'Цена'], ['costOld', 'Старая цена']];
    const [imageOne, setImageOne] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>('');

    const [countOne, setCountOne] = useState<number>(0);
    // console.log(imageOne)
    // console.log(discountObject)

    useEffect(() => {
        // console.log(Boolean(!imageUrl))
    if(!imageUrl) return
        let img: any = document.querySelector("#img");

        if(Number(img.clientHeight) < 44 ){
            setCountOne(countOne+ 1)
        }else{
            console.log(img.clientHeight, img.clientWidth, countOne)
        }
    }, [countOne, imageUrl])



    const resizeFile = (file:any) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri:any) => {
                    // setImageUrl(uri)
                    resolve(uri);
                },
                "base64"
            );
        });


    const dataURIToBlob = (dataURI: any) => {
        const splitDataURI = dataURI.split(",");
        const byteString =
            splitDataURI[0].indexOf("base64") >= 0
                ? atob(splitDataURI[1])
                : decodeURI(splitDataURI[1]);
        const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++){ ia[i] = byteString.charCodeAt(i)}
        return new Blob([ia], { type: mimeString });
    };


    let asd = async (event:any):Promise<void> =>{
        if (event.target.files && event.target.files[0]) {
            try {
                const file = event.target.files[0];
                const image:any = await resizeFile(file);
                setImageOne(image)
                // setImageUrl(URL.createObjectURL(image));
                // console.log(image);
            } catch (err) {
                console.log(err);
            }

        }
    }
    useEffect(() => {
        if(!imageOne) return
        setImageUrl(URL.createObjectURL(dataURIToBlob(imageOne)));
        console.log(dataURIToBlob(imageOne))
    }, [imageOne])
    let sendToServer = () => {


        const formData = new FormData();
        formData.append("name", discountObject.name);
        formData.append("description", discountObject.description);
        formData.append("category", discountObject.category);
        formData.append("discount", discountObject.discount);
        formData.append("cost", discountObject.cost);
        formData.append("costOld", discountObject.costOld);
        formData.append("image", dataURIToBlob(imageOne));
        // formData.append("priceImg", `${Math.ceil(+priceImg)}`);
        // formData.append("userId", `${user.user.id}`);

    }

    //

    // ==========================================================================================================

    return (
        <>
            <MapChoice />

            <Row className="mb-3"><h6>Шаг №2: Заполните хар-ки</h6>
                <hr/>
                <Col xs={12} md={6}>
                    {discountObjectArray.map((elem) => (
                            <TextField sx={{ p: 1, width: { sm: 'none', md: '50%' } }} id="outlined-basic" label={elem[1]} variant="outlined" fullWidth
                                       onChange={(e) => setDiscountObject({...discountObject, [elem[0]]: e.target.value})}/>
                        )
                    )
                    }
                </Col>
                <Col xs={12} md={6}>
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
                </Col>
            </Row>










            <Row className="mb-3">
                <h6>Шаг №3: Загрузите картинку (600х600 пикселей, до 1 Мбайт)</h6><hr/>
                <Col xs={12} md={6}>


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
            </Col>
            <Col xs={12} md={6}>
                <h6>Здесь появится ваша картинка после оптимизации:</h6>
                <img id="img" alt="preview image" src={imageUrl} style={{maxWidth: '300px', maxHeight: '300px', margin: '30px'}}/>

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