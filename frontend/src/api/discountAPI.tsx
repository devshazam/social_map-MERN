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
    const {data} = await $host.post('/api/discounts/fetch-discount-by-map', param)
    console.log(data)
    return data
}


export const fetchAdById = async (param: any) => { // TODO определить тип переменной
    const {data} = await $host.post('/api/discounts/fetch-ads-by-id', param)
    console.log(data)
    return data
}
export const fetchAdsList = async (param: any) => { // TODO определить тип переменной
    const {data} = await $host.post('/api/discounts/fetch-ads-list', param)
    console.log(data)
    return data
}
// export const checkIp = async () => { // TODO определить тип переменной
//     const {data} = await $host.post('/api/discounts/check-ip')
//     console.log(data)
//     return data
// }

export const recordErrorToLog = async (param: any) => { // TODO определить тип переменной
    const {data} = await $host.post('/api/discounts/record-error-to-log', param)
    console.log(data)
    return data
}

export const fetchUserAdsList = async (param: any) => {
    const {data} = await $authHost.post('/api/discounts/fetch-user-ads-list', param)
    console.log(data)
    return data
}

export const deleteUserAdsList = async (param: any) => {
    const {data} = await $authHost.post('/api/discounts/delete-user-ads-list', param)
    console.log(data)
    return data
}

export const fetchAdByIdForUser = async (param: any) => { // TODO определить тип переменной
    const {data} = await $host.post('/api/discounts/fetch-ads-by-id-for-user', param)
    console.log(data)
    return data
}
export const saveChangesOfDiscount = async (param: any) => { // TODO определить тип переменной
    const {data} = await $host.post('/api/discounts/save-changes-of-discount', param)
    console.log(data)
    return data
}
export const checkNumbersOfAds = async (param: any) => { // TODO определить тип переменной
    const {data} = await $host.post('/api/discounts/check-numbers-of-ads', param)
    console.log(data)
    return data
}