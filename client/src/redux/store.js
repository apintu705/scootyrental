import { createStore, applyMiddleware ,combineReducers} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"
import {loading} from "./reducers/loading"
import { reducer } from './reducers/reducer';
import {error} from "./reducers/error"

const rootReducers=combineReducers({
    reducer:reducer,
    loading:loading,
    error:error
})

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});
export const store = createStore(
  rootReducers,
  composeEnhancers(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);