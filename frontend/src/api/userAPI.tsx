import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email: string, password: string, name: string, phone: string, role: string) => {
    const {data} = await $host.post('/api/user/registration', {email, password, name, phone, role})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}




export const login = async (email: string, password: string) => {
    const {data} = await $host.post('/api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const logReg = async (param: any) => {
    const {data} = await $host.post('/api/user/login-registration', param)
    localStorage.setItem('token', data.token)
    console.log(data)
    return jwt_decode(data.token)
}




export const check = async () => {
        const {data} = await $authHost.get('/api/user/auth')
        localStorage.setItem('token', data.token)
        return jwt_decode(data.token)
}

// export const changeCredencials = async (email, phone) => {
//     const {data} = await $authHost.post('/api/user/change', {email, phone})
//     localStorage.setItem('token', data.token)
//     return jwt_decode(data.token)
// }
