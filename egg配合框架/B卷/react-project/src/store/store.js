import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
let initData = {
    listData: [],
    item: ''
};
let actions = {
    SET_DATA(state, value) {
        state.listData = value;   //设置数据
    },
    SET_ID(state, value) {
        state.item = value;    //设置详情id
    }
}


let reducer = (state = initData, action) => {
    let newState = JSON.parse(JSON.stringify(state));
    actions[action.type] && actions[action.type](newState, action.value);
    return newState;
}

export default createStore(reducer, applyMiddleware(thunk));