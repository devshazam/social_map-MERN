import {$host} from "./index";


export const callHello = async () => {
    const {data} = await $host.get('/api/hello')
    console.log(data)
    return data
}

