import React,  { useState } from 'react';
import Col from "react-bootstrap/Col";
import Button from '@mui/material/Button';
import Resizer from "react-image-file-resizer";


const ImageResizingComp = (props:any) => {
    const [imageUrl, setImageUrl] = useState<string>('');
    
    function resizeFile(file:any) { // https://www.npmjs.com/package/react-image-file-resizer
        return new Promise((resolve) => {
            Resizer.imageFileResizer( file, 500, 500, "JPEG", 80, 0,
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
            } catch (err) {
                console.log(err);
            }
        }
    }

    // ==========================================================================================================
    return (
        <>
                <Col xs={12}  md={{ span: 6, offset: 3 }} className='mb-2'>
                    {
                        imageUrl ?
                         <div className="card-user_cab">
                                <div className="back_wrap_new">
                                    <img  alt="Место для картинки" src={imageUrl} className='card_img-user_cab' />
                                </div>
                            </div>
                        :
                            <Button
                            fullWidth
                            variant="contained"
                            component="label"
                            className="lable_button"
                            >
                                <img src='/files/img/icons8-camera-100.png' alt="картинка"></img>
                                <br></br>
                                <p>Загрузите картинку (jpeg/png)*</p>
                                <input accept="image/jpeg, image/png"
                                    type="file"
                                    hidden
                                    onChange={asd}
                                />
                            </Button>
                    }
                    {Boolean(!imageUrl && props.flag === 0) && <p className='image_res-alert_note' >Картинка не загружена!</p> }
            </Col>

        </>
    );
};

export default ImageResizingComp;

