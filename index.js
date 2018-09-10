import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import { registerScreens } from './screens';
import createStore from './store/createStore';

const store = createStore();

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  appStyle: {
    navBarHidden: true,
    drawUnderNavBar: true,
    statusBarTextColorScheme: 'light',
    statusBarColor: 'transparent',
    screenBackgroundColor: '#e0e0e0',
  },
  screen: {
    screen: 'home', // unique ID registered with Navigation.registerScreen
  },
  passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
  animationType: 'fade', // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
});
