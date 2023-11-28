"use client";

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import {store} from "./store"
import { ErrorBoundary } from "react-error-boundary";
import {logError, Fallback} from './errors-handling/errorLogging';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ErrorBoundary FallbackComponent={Fallback} onError={logError}>
      <App />
    </ErrorBoundary>
  </Provider>
);