import React from 'react';
import { StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import store from './common/store';
import { Provider } from 'react-redux';
import Navigation from './common/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PortalProvider } from '@gorhom/portal';
import AlertProvider from './common/hooks/alert';
import AlertPromptProvider from './common/hooks/alertPrompt';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PortalProvider>
            <AlertProvider>
              <AlertPromptProvider>
                <StatusBar barStyle="dark-content" />
                <Navigation />
              </AlertPromptProvider>
            </AlertProvider>
          </PortalProvider>
        </GestureHandlerRootView>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
