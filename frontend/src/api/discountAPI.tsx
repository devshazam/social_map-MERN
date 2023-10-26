import {$authHost, $host} from "./index";


export const createDiscount = async (param: [any]) => { // TODO определить тип переменной
    const {data} = await $authHost.post('/api/discount/create-discount', param)
    console.log(data)
    return data
}
