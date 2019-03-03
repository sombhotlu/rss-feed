import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalState from './context/GlobalState';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <GlobalState>
        <BrowserRouter basename="/rss-feed"> 
            <App />
        </BrowserRouter>
    </GlobalState>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
