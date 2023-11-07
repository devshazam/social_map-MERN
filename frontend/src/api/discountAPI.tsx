import {$authHost, $host} from "./index";


export const fetchYandexAddress = async (param: any) => { // TODO определить тип переменной
    const {data} = await $authHost.post('/api/discount/fetch-yandex-address', param)
    console.log(data)
    return data
}
export const createDiscount = async (param: any) => { // TODO определить тип переменной
    const {data} = await $authHost.post('/api/discount/create-discount', param)
    console.log(data)
    return data
}
