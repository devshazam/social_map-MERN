import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



// import React, {createContext} from 'react';

// import ReactDOM from 'react-dom/client';

// import App from './App';
// import UserStore from "./store/UserStore";
// import DeviceStore from "./store/DeviceStore";
// import HelpersStore from './store/Helpers';

// export const Context = createContext(null)



// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//         <Context.Provider value={{
//           user: new UserStore(),
//           device: new DeviceStore(),
//           helpers: new HelpersStore(),
//       }}>
//           <App />
//       </Context.Provider>,
// );
