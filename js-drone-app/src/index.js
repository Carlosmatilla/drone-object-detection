import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { ToastProvider } from "react-toast-notifications";
import './reset.sass'


ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismissTimeout={3500} >
      <App />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


