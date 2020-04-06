import axios from 'axios';



export function http(method, url, data = {}) {
    let val = method === 'get' ? 'params' : 'data';
    let obj = {
        method,
        url,
        headers: {
            token: window.localStorage.token
        }
    };
    obj[val] = data;
    return axios(obj).catch(error => {
        if (error.response && error.response.status === 404) {
            alert('接口找不到');
        }
    })
}