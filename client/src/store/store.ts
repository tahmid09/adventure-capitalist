import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'

import gamingReducer from './gaming/gamingReducer'

const rootReducer = combineReducers({
	gaming: gamingReducer
});

const store = createStore(rootReducer, applyMiddleware( thunk))

export default store