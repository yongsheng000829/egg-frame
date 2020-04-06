import axios from 'axios';

export default (method, url, data = []) => {
    let val = method === 'get' ? 'params' : 'data';
    let obj = {
        method, url,
        headers: {
            token: window.localStorage.token?window.localStorage.token:'now'
        }
    };
    obj[val] = data;
    return axios(obj).catch(error => {
        if (error.response.status === 404) {
            alert('接口不存在');
        }
    })
}