import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App';
import rootReducer from './reducers';

const container = document.getElementById('root');

const root = createRoot(container);

const store = configureStore({
  reducer: rootReducer,
  devTools: true
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
