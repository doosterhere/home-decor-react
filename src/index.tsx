import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './assets/styles/styles.scss';
import {Provider} from "react-redux";
import {setupStore} from "./app/store/store";

const store = setupStore();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);