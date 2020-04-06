import axios from '../untils/axios';


let setData = async (next) => {

    let res = await axios('get', '/allVote');
    let { code, msg, data } = res.data;
    if (code === 0) {
        next({
            type: 'SET_DATA',
            value: data
        })
    }
}

export { setData };