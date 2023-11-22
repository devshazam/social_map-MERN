import React, { useState, useEffect }from 'react';
import Col from "react-bootstrap/Col";
import {Row} from "react-bootstrap";
import Button from '@mui/material/Button';
import Resizer from "react-image-file-resizer";
import {useDispatch} from "react-redux";

const ImageResizingComp = (props:any) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [countOne, setCountOne] = useState<number>(0);
    const dispatch = useDispatch();

    // console.log(imageUrl)
    // console.log(discountObject)

    useEffect(() => {
            if(!imageUrl) return
                let img: any = document.querySelector("#img");
                if(Number(img.clientHeight) < 44 ){
                    setCountOne(countOne+ 1)
                }else{
                    console.log(img.clientHeight, img.clientWidth, countOne)
                }
    }, [countOne, imageUrl])
    // https://www.npmjs.com/package/react-image-file-resizer
    function resizeFile(file:any) {
        return new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                500,
                500,
                "JPEG",
                80,
                0,
                (uri: any) => {
                    setImageUrl(uri);
                    resolve(uri)
                },
                "file"
            );
        });
    }
    async function asd(event:any):Promise<void> {
        if (event.target.files && event.target.files[0]) {
            console.log(event.target.files[0], 111)
            try {
                const file = event.target.files[0];
                const image:any = await resizeFile(file);
                console.log(image, 222)
                dispatch({type: "IMG", payload: image})
                setImageUrl(URL.createObjectURL(image));
            } catch (err) {
                console.log(err);
            }

        }
    }

    // function dataURIToBlob(dataURI: any){ // При  необходимости можно найти URL артинки с помощью этой ф-ции:
    //     const splitDataURI = dataURI.split(",");
    //     const byteString =
    //         splitDataURI[0].indexOf("base64") >= 0
    //             ? atob(splitDataURI[1])
    //             : decodeURI(splitDataURI[1]);
    //     const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    //     const ia = new Uint8Array(byteString.length);
    //     for (let i = 0; i < byteString.length; i++){ ia[i] = byteString.charCodeAt(i)}
    //     return new Blob([ia], { type: mimeString });
    // };

    // useEffect(() => {
    //     if(!imageOne) return
    //     setImageUrl(URL.createObjectURL(dataURIToBlob(imageOne)));
    // }, [imageOne])



    // ==========================================================================================================
    return (
        <>


                <Col xs={12} md={6}>
                    <Button
                        variant="contained"
                        component="label"
                    >
                       Загрузить файл
                        <input accept="image/jpeg, image/png"
                            type="file"
                            hidden
                               onChange={asd}
                        />
                    </Button>
                    <p style={{fontSize: 12}}>* При нажатии на кнопку "Загрузить файл" картинка автоматически преобразуется в формат jpeg и размер 500х500 пикселей</p>
            </Col>
            <Col xs={12} md={6}>
                <h6>Здесь появится ваша картинка после оптимизации:</h6>


                    <img id="img" alt="Место для картинки" src={imageUrl} style={{maxWidth: '300px', maxHeight: '300px', margin: '30px', width: '300px', height: '300px'}}/>
                {Boolean(!imageUrl && props.flag == 0) &&
                    <p style={{color: 'red', fontSize: '15px', border: '1px solid red'}}>Картинка не загружена!</p>
                }
            </Col>



        </>
    );
};

export default ImageResizingComp;

