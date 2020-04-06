import axios from 'axios';



export default (method, url, data = {}) => {
    let val = method === 'get' ? 'params' : 'data';
    let token = window.localStorage.token;
    let obj = {
        method, url,
        headers: {
            token: token ? token : 'now'
        }
    };
    obj[val] = data;
    return axios(obj).catch(error => {
        let status = error.response.status;
        if (status === 404) {
            alert('接口未找到');
        } else if (status === 500) {
            alert('服务器错误');
        }
    })
}