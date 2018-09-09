import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import createStore from './store/createStore';
import { registerScreens } from './routes';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    registerScreens(createStore, Provider);
    this.startApp();
  }

  startApp() {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'home', // unique ID registered with Navigation.registerScreen
      },
      passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
      animationType: 'fade', // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
    });
  }
}
