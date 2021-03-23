import React from 'react'
import ReactDom from 'react-dom'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux';
import App from '@/views/app'
import store from './store';

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("App")
)