import React from 'react';
import RouteView from './router/Router';
import routeData from './router/router-config';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouteView routeData={routeData} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
