import thunk , {ThunkMiddleware} from 'redux-thunk'; 
import collectionsReducer from './reducer';
import { createStore, applyMiddleware } from 'redux';
import { RootState } from './reducer';

const store = createStore(collectionsReducer, applyMiddleware(thunk as ThunkMiddleware<RootState>));

export default store; 