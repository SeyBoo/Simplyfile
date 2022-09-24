import React from 'react';
import {StatusBar} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import Navigation from './common/navigation';

const App = () => {
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </NativeBaseProvider>
  );
};

export default App;
