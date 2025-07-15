import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Slice/AuthSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux';
import selectReducer from '/src/redux/Slice/Selecteduser.js';


const persistConfig = {
    key : 'root',
    storage,
  };
  
  const rootReducer = combineReducers({
    auth: authReducer,
    selectedUser : selectReducer
    
});

 const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
    
});

export const persistor = persistStore(store);