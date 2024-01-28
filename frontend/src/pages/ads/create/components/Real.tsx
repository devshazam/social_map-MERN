import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import { TextField } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import globalParamsObject from "../../../../parameters/mainAppParameterObject";

const Discounts = (props: any) => {
    const [uniqObject, setUniqObject] = useState<any>({});

    useEffect(() => {
        if (Object.values(uniqObject).length > 0) {
            props.changeCreateObject({
                uniquePart: JSON.stringify(uniqObject),
            });
        }
    }, [JSON.stringify(uniqObject)]);

    // ==========================================================================================================

    return (
        <>
            <Col xs={12}  md={{ span: 6, offset: 3 }} >
                <TextField
                    label="7) Введите цену товара*:"
                    variant="outlined"
                    fullWidth
                    sx={{
                        mb: 1,
                    }}
                    error={Boolean(
                        !props.createObject.cost && props.flag === 0
                    )}
                    onChange={(e: any) =>
                        props.changeCreateObject({ cost: e.target.value })
                    }
                />
            </Col>
            <Col xs={12} md={{ span: 6, offset: 3 }} >
    
                <FormControl
                    fullWidth
                    sx={{ mb: 1,  }}
                >
                    <InputLabel
                        error={Boolean(
                            !props.createObject.avitoCategory &&
                                props.flag === 0
                        )}
                    >
                        8) Выберите категорию*:
                    </InputLabel>
                    <Select
                        // value={props.createObject.avitoCategory ? props.createObject.avitoCategory : '5'}
                        defaultValue={""}
                        error={Boolean(
                            !props.createObject.avitoCategory &&
                                props.flag === 0
                        )}
                        onChange={(e: any) =>
                            props.changeCreateObject({
                                avitoCategory: e.target.value,
                            })
                        }
                    >
                        {globalParamsObject.real.avitoCategory.map(
                            (item: any, index: any) => {
                                return (
                                    <MenuItem key={index + 1} value={index + 1}>
                                        {item}
                                    </MenuItem>
                                );
                            }
                        )}
                    </Select>
                </FormControl>
                </Col>
                { props.createObject.avitoCategory && 
                    <Col xs={12} md={{ span: 6, offset: 3 }} >
                        <FormControl
                        fullWidth
                        sx={{ mb: 1, }}
                        >
                        <InputLabel
                            error={Boolean(
                                !props.createObject.avitoSubCategory &&
                                    props.flag === 0
                            )}
                        >
                            8) Выберите подкатегорию*:
                        </InputLabel>
                        <Select
                            // value={props.createObject.avitoCategory ? props.createObject.avitoCategory : '5'}
                            defaultValue={""}
                            error={Boolean(
                                !props.createObject.avitoSubCategory &&
                                    props.flag === 0
                            )}
                            onChange={(e: any) =>
                                props.changeCreateObject({
                                    avitoSubCategory: e.target.value,
                                })
                            }
                        >
                                {props.createObject.avitoCategory && globalParamsObject.real.avitoSubCategory[+props.createObject.avitoCategory - 1].map(
                                    (item: any, index: any) => {
                                        return (
                                            <MenuItem key={index + 1} value={index + 1}>
                                            {item}
                                        </MenuItem>
                                        );
                                    }
                                )}
                        </Select>
                        </FormControl>
                    </Col>
                }

            { (props.createObject.avitoCategory && props.createObject.avitoSubCategory) &&
                globalParamsObject.real.avitoParametrs[
                    globalParamsObject.real.avitoCategoryToParam[+props.createObject.avitoCategory - 1][+props.createObject.avitoSubCategory - 1]
                ].map((item: any, index2: any) => {
                    return (
                        <Col xs={12} md={{ span: 6, offset: 3 }}  key={index2}>
                            {typeof item === "string" ? (
                                <TextField
                                    label={item}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mb: 1 }}
                                    onChange={(e) =>
                                        setUniqObject({
                                            ...uniqObject,
                                            [index2]: [item, e.target.value],
                                        })
                                    }
                                />
                            ) : (
                                <FormControl fullWidth sx={{ mb: 1 }}>
                                    <InputLabel>{item[0]}</InputLabel>
                                    <Select
                                        defaultValue={""}
                                        onChange={(e) =>
                                            setUniqObject({
                                                ...uniqObject,
                                                [index2]: [
                                                    item[0],
                                                    e.target.value,
                                                ],
                                            })
                                        }
                                    >
                                        {item[1].map(
                                            (item2: any, index3: any) => {
                                                return (
                                                    <MenuItem
                                                        key={index3}
                                                        value={item2}
                                                    >
                                                        {item2}
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </Select>
                                </FormControl>
                            )}
                        </Col>
                    );
                })}
        </>
    );
};

export default Discounts;
