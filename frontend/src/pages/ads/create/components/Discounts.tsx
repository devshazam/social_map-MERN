import React from "react";
import Col from "react-bootstrap/Col";
import { TextField } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import globalParamsObject from "../../../../parameters/mainAppParameterObject";

const Discounts = (props: any) => {
    // ==========================================================================================================
    return (
        <>
            <Col xs={12} md={{ span: 6, offset: 3 }}>
                <TextField
                    label="7) Введите цену со скидкой*:"
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
            <Col xs={12} md={{ span: 6, offset: 3 }}>
                <FormControl
                    fullWidth
                    sx={{ mb: 1}}
                >
                    <InputLabel
                        error={Boolean(
                            !props.createObject.discount && props.flag === 0
                        )}
                    >
                        8) Выберите размер скидки*:
                    </InputLabel>
                    <Select
                        // value={props.createObject.discount}
                        defaultValue={""}
                        // value={props.createObject.discount ? props.createObject.discount : '5'}
                        error={Boolean(
                            !props.createObject.discount && props.flag === 0
                        )}
                        onChange={(e: any) =>
                            props.changeCreateObject({
                                discount: e.target.value,
                            })
                        }
                    >
                        {globalParamsObject.discounts.discountSize.map(
                            (item: any, index: any) => {
                                return (
                                    <MenuItem key={index + 1} value={index + 1}>
                                        {item}%
                                    </MenuItem>
                                );
                            }
                        )}
                    </Select>
                </FormControl>
            </Col>
            <Col xs={12} md={{ span: 6, offset: 3 }}  className="mb-2">
                <FormControl fullWidth>
                    <InputLabel
                        id="demo-simple-select-label"
                        error={Boolean(
                            !props.createObject.discountCategory &&
                                props.flag === 0
                        )}
                    >
                        9) Выберите категорию скидки*:
                    </InputLabel>
                    <Select
                        defaultValue={""}
                        error={Boolean(
                            !props.createObject.discountCategory &&
                                props.flag === 0
                        )}
                        onChange={(e: any) =>
                            props.changeCreateObject({
                                discountCategory: e.target.value,
                            })
                        }
                    >
                        {globalParamsObject.discounts.discountsCategory.map(
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
        </>
    );
};

export default Discounts;
