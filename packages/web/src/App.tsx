import * as React from 'react';

import { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider, PersistGate } from '@share-redux/redux-common';

import Home from 'pages/Home';
import defaultStore from 'store';
import Profile from 'pages/Profile';
import useToast from 'hooks/useToast';
import Preloader from 'components/Preloader';
import InitStateWrapper from 'layouts/InitStateWrapper';

const App: FC = () => {
  const toast = useToast();
  const { store: initStore, persistor } = defaultStore({ toast });

  return (
    <Provider store={initStore}>
      <PersistGate persistor={persistor} loading={<Preloader />}>
        <BrowserRouter>
          <InitStateWrapper>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/profile' component={Profile} />
            </Switch>
          </InitStateWrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
