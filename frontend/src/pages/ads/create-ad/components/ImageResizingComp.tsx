import React, { useState, useEffect, useRef }from 'react';
import Col from "react-bootstrap/Col";
import Button from '@mui/material/Button';
import Resizer from "react-image-file-resizer";

import {dimensionsToStyleObject} from '../../../../utils/helpFunctions'

const ImageResizingComp = (props:any) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [countOne, setCountOne] = useState<number>(0);
    const mapRef = useRef<any>(null);
    
    useEffect(() => {
            if(!imageUrl || props.createObject.dimensions) return;
                if(mapRef && mapRef.current && mapRef.current.clientHeight ){
                    if(+mapRef.current.clientHeight < 30){
                        setCountOne(countOne + 1)
                    }else{
                        props.changeCreateObject({dimensions: JSON.stringify([+mapRef.current.clientWidth, +mapRef.current.clientHeight])});
                    }
                }else{
                    setCountOne(countOne + 1)
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
                    // setImageUrl(uri);
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
                const image:any = await resizeFile(event.target.files[0]);
                setImageUrl(URL.createObjectURL(image));
                props.changeCreateObject({img: image})
                // setImageInsert(image)
            } catch (err) {
                console.log(err);
            }
        }
    }

    // ==========================================================================================================
    return (
        <>
                <Col xs={12} md={6}>
                    {
                        !props.createObject.dimensions ?
                        <>
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
                        </>
                    :
                        <p style={{}}>Мы социальный проект - поэтому мы экономим место на хостинге, придерживаясь правила - "одна картинка для одного объявления!"</p>
                    }
            </Col>
            <Col xs={12} md={6}>
                <h6>Здесь появится ваша картинка после оптимизации:</h6>
                    {
                        props.createObject.dimensions ?
                        <div className='' style={{border: '1px solid black', margin: 'auto', width: '80%', backgroundColor: '#c5c5c5'}}>
                            <img  alt="Место для картинки" src={imageUrl} style={{...dimensionsToStyleObject(JSON.parse(props.createObject.dimensions)), boxSizing: 'border-box'}}/>
                        </div>
                        :
                        <img id="img" ref={mapRef} alt="Место для картинки" src={imageUrl} />
                    }
                {Boolean(!imageUrl && props.flag == 0) &&
                    <p style={{color: 'red', fontSize: '15px', border: '1px solid red'}}>Картинка не загружена!</p>
                }
            </Col>
        </>
    );
};

export default ImageResizingComp;

