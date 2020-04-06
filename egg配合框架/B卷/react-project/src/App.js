import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import routeData from './router/router.config';
import RouteView from './router/router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RouteView routeData={routeData}></RouteView>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
