import { Navigation } from 'react-native-navigation';

import Home from './quiz/components/home';

export const registerScreens = (store, Provider) => {
  Navigation.registerComponent('home', () => Home, store, Provider);
}
