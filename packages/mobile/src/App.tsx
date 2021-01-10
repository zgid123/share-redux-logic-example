import * as React from 'react';
import * as eva from '@eva-design/eva';

import { FC } from 'react';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, PersistGate } from '@share-redux/redux-common';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';

import Main from 'layouts/Main';
import defaultStore from 'store';
import useToast from 'hooks/useToast';
import Preloader from 'components/atoms/Preloader';
import initReactotron from 'initializers/reactotron';
import InitStateWrapper from 'layouts/InitStateWrapper';

const enhancer = initReactotron();

const App: FC = () => {
  const toast = useToast();
  const { store: initStore, persistor } = defaultStore({
    toast,
    enhancers: enhancer ? [enhancer] : [],
  });

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Provider store={initStore}>
          <PersistGate persistor={persistor} loading={<Preloader />}>
            <InitStateWrapper>
              <NavigationContainer>
                <Main />
              </NavigationContainer>
            </InitStateWrapper>
          </PersistGate>
        </Provider>
      </ApplicationProvider>
    </>
  );
};

export default App;
