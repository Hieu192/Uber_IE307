import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
// slices
import appReducer from './slices/app';
import authReducer from './slices/auth';
import methodReducer from './slices/methodPayload';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage:AsyncStorage,
  keyPrefix: 'redux-',
  //   whitelist: [],
  blacklist: ["app"],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  method: methodReducer
});

export { rootPersistConfig, rootReducer };
