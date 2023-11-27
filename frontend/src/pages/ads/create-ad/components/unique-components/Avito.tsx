import React, { useState, useEffect, useRef }from 'react';

import Col from "react-bootstrap/Col";
import { TextField} from "@mui/material";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";


const Discounts = (props:any) => {
    const [uniqObject, setUniqObject] = useState<any>({});
    const [mainObject, setMainObject] = useState<any>({});

    const dispatch = useDispatch();
    
    
    let array: any = [
                        // недвижимость
                        ['Метраж:', ['Санузел:', ['Раздельный', 'Совмещенный']], 'Этаж:', 'Кол-во комнат:', 'Интернет и ТВ:', 'Залог:', 'Техника:', 'Мебель:', 'Площадь кухни:', 'Ремонт:'],
                        // недвижимость
                        ['Метраж:', ['Санузел:', ['Раздельный', 'Совмещенный']], 'Этаж:', 'Кол-во комнат:', 'Интернет и ТВ:', 'Залог:', 'Техника:', 'Мебель:', 'Площадь кухни:', 'Ремонт:'],
                        // недвижимость
                        ['Метраж:', ['Санузел:', ['Раздельный', 'Совмещенный']], 'Этаж:', 'Кол-во комнат:', 'Интернет и ТВ:', 'Залог:', 'Техника:', 'Мебель:', 'Площадь кухни:', 'Ремонт:'],
                        // автомобиль
                        ['Год выпуска:', 'Пробег:', 'Мощность двигателя:', 'Цвет:', ['Тип коробки передач', ['Механическая', 'Автоматическая', 'Робот']], 'Объем двигателя:', 'VIN:', 'Кол-во владельцев:'],
                        // личные вещи
                        ['Размер:', 'Состояние:', 'Бренд:', 'Цвет:'],
                        // Электроника
                        ['Состояние:', 'Бренд:', 'Цвет:'],
                        // Работа
                        ['Опыт работы:', 'График:', ['Сфера деятельности:', ['Бухгалтерия', 'Медицина', 'Охрана', 'Производство', 'Транспорт, такси', 'Красота и фитнес', 'Страхование', 'Доставка']]],
                        // услуги
                        [['Сфера деятельности:', ['Перевозки', 'Ремонт и строительство', 'Красота', 'Клининг', 'Ремонт техники', 'Деловые услуги', 'Обучение']], 'Опыт работы:', 'Специальность:', 'Предоплата:']

    ]


    useEffect(() => {
        dispatch({type: "MAIN", payload: {cost: mainObject.cost, avitoCategory: mainObject.avitoCategory}})


        dispatch({type: "UNIQUE", payload: JSON.stringify(uniqObject)})
    }, [uniqObject])
    // ==========================================================================================================
    return (
        <>
         <Col xs={12} md={6}>
                     <TextField  id="outlined-basic" label="Цена (плата):" variant="outlined" fullWidth
                                sx={{mb: 1, pr:1, width: { sm: 'none', md: '50%'}}}
                                error={Boolean(!mainObject.cost && props.flag == 0)}
                                onChange={(e) => setMainObject({...mainObject, cost: e.target.value})}/>
                    <FormControl fullWidth sx={{mb: 1, pl:1, width: { sm: 'none', md: '50%'}}}>
                        <InputLabel id="demo-simple-select-label" error={Boolean(!mainObject.avitoCategory && props.flag == 0)}>Категория:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={mainObject.avitoCategory}
                            error={Boolean(!mainObject.avitoCategory && props.flag == 0)}
                            label="Age"
                            onChange={(e: any) => setMainObject({...mainObject, avitoCategory: e.target.value})}
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
                    </Col>


        {mainObject.avitoCategory &&  array[mainObject.avitoCategory - 1].map((item:any, index2: any) => {
            return(
        
                <Col xs={12} md={6}>
                    
                    {typeof item === 'string' ?
                    <TextField  id="outlined-basic" label={item} variant="outlined" fullWidth
                                sx={{mb: 1}}
                                onChange={(e) => setUniqObject({...uniqObject, [index2]: [item, e.target.value]})}/>
                    :   
                    <FormControl fullWidth sx={{mb: 1}}>
                        <InputLabel id="demo-simple-select-label" >{item[0]}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={uniqObject.discount}
                            label="Age"
                            onChange={(e) => setUniqObject({...uniqObject, [index2]: [item[0], e.target.value]})}
                        >
                            { 
                                item[1].map((item2:any) =>{
                                    return (
                                    <MenuItem value={item2}>{item2}</MenuItem>
                                );
                                })
                            }
                            
                        </Select>
                    </FormControl>
                    }
                </Col>
            );
})
}

        </>
    );
};

export default Discounts;
