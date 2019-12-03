import { createStore, combineReducers } from 'redux';
import listingReducer from '../Reducers/listingReducer';
import toastReducer from '../Reducers/toastReducer';
import { saveState, loadState } from './localStorage';

const localStorageState = loadState();

const rootReducer = combineReducers({
  listingReducer,
  toastReducer,
});
const store = createStore(rootReducer, localStorageState);

store.subscribe(() => {
  saveState({
    listingReducer: store.getState().listingReducer,
  });
});

export default store;
