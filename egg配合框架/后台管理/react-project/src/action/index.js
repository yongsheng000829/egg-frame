import React, { Component } from 'react'

let setData = async (dispatch) => {
    const { http } = Component.prototype;
    let res = await http('get', '/list/data');
    let { code, msg, data } = res.data;
    if (code === 0) {
        dispatch({
            type: 'SET_DATA',
            val: data
        });
        return;
    }
    alert(msg);
}
export { setData };


