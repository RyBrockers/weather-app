import 'raf/polyfill';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import App from './components/app';

const app = (
  <HashRouter>
    <Route component={App} />
  </HashRouter>
);

render(app, document.getElementById('root'));
