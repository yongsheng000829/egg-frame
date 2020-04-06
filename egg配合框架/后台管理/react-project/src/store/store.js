import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import voteReducer from './vote';

let reducers = combineReducers({
    voteReducer
})

export default createStore(reducers, applyMiddleware(thunk));