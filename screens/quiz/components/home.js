import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { compose, withHandlers, lifecycle } from 'recompose';

import { fetchQuiz } from '../duck';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bodyText: {
    fontSize: 26,
    fontWeight: '500',
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
  }
});

const Home = ({
  onBegin
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Welcome to the Trivia Challenge!
      </Text>
      <Text style={styles.bodyText}>
        You will be presented with 10 True or False questions.
      </Text>
      <Text style={styles.bodyText}>
        Can you score 100%?
      </Text>
      <TouchableOpacity onPress={onBegin}>
        <Text style={styles.buttonText}>
          BEGIN
        </Text>
      </TouchableOpacity>
    </View>);
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
  dispatchFetchQuiz: fetchQuiz,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    onBegin: ({ navigator }) => () => navigator.push({
      screen: 'question',
    })
  }),
  lifecycle({
    componentWillMount() {
      this.props.dispatchFetchQuiz();
    }
  })
)(Home);
