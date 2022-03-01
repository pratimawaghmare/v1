import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TopAppBar from './TopAppBar';
import reportWebVitals from './reportWebVitals';
import Amplify from 'aws-amplify';
import awsExports from './aws-exports';
import NavigationDrawer from './NavigationDrawer';
Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <TopAppBar />
    <NavigationDrawer />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
