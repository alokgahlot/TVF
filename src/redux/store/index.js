import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {persistStore, persistReducer} from 'redux-persist';
import {createStore, applyMiddleware, compose} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

//custom imports
import reducers from '../reducers';

const enhancer = compose(
  applyMiddleware(
    thunk,
    createLogger({
      predicate: () => __DEV__,
    }),
  ),
);

const persistConfig = {
  key: 'root',
  timeout: 0,
  storage: AsyncStorage,
  whitelist: ['reducer', 'liked', 'watchlist', 'downloads'],
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, {}, enhancer);
export const persistor = persistStore(store);
