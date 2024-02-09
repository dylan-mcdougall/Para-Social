import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { restoreCSRF, csrfFetch } from './store/csrf';
import './index.css';
import App from './App';
import { store } from './store';
import * as sessionActions from "./store/session";
import Navigation, { NavProvider } from './context/MobileNavigation';
import { ModalProvider, Modal } from './context/Modal/Modal';
import { MenuProvider, Menu } from './context/ContextMenu/ContextMenu';


if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <MenuProvider>
      <ModalProvider>
        <ReduxProvider store={store}>
          <NavProvider>
            <BrowserRouter>
              <App />
              <Menu />
              <Modal />
            </BrowserRouter>
          </NavProvider>
        </ReduxProvider>
      </ModalProvider>
    </MenuProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
