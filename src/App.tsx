import React from 'react';
import {StatusBar} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import store from './common/store';
import {Provider} from 'react-redux';
import Navigation from './common/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
