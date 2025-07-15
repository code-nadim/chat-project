import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import { persistor, store } from './redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';




export default function App() {
  return (
    <>
   
      <Provider store={store} >
          <PersistGate loading={null}  persistor={persistor} >
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
        </PersistGate>
      </Provider>
     
   
    </>
  );
}
