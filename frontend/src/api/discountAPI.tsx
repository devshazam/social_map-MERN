import {$authHost, $host} from "./index";


export const fetchYandexAddress = async (param: any) => { // TODO определить тип переменной
    const {data} = await $authHost.post('/api/discounts/fetch-yandex-address', param)
    console.log(data)
    return data
}
export const createDiscount = async (param: any) => { // TODO определить тип переменной
    const {data} = await $authHost.post(`/api/discounts/create-discount`, param)
    console.log(data)
    return data
}
// export const fetchDiscountByQwery = async (param: any) => { // TODO определить тип переменной
//     const {data} = await $authHost.post('/api/discounts/fetch-discount-by-qwery', param)
//     console.log(data)
//     return data
// }
export const fetchDiscountByMap = async (param: any) => { // TODO определить тип переменной
    const {data} = await $authHost.post('/api/discounts/fetch-discount-by-map', param)
    console.log(data)
    return data
}

export const fetchAdsList = async (param: any) => { // TODO определить тип переменной
    const {data} = await $authHost.post('/api/discounts/fetch-ads-list', param)
    console.log(data)
    return data
}

