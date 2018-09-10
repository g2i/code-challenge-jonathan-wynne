import { Navigation } from 'react-native-navigation';

import Home from './quiz/components/home';
import Question from './quiz/components/question';
import Results from './quiz/components/results';

export const registerScreens = (store, Provider) => {
  Navigation.registerComponent('home', () => Home, store, Provider);
  Navigation.registerComponent('question', () => Question, store, Provider);
  Navigation.registerComponent('results', () => Results, store, Provider);
}
