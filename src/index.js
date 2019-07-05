import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import reducer from './reducers';
import './index.css';
import App from './components/App';
import middleware from './middleware'

const store = createStore(reducer, middleware);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
     document.getElementById('root')
)
