import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import { compose, withProps, withHandlers } from 'recompose';

import { setAnswer, selectCurrentItemIndex, selectCurrentItem } from '../duck';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  questionContainer: {
    height: 300,
    padding: 30,
    borderWidth: 2,
    justifyContent: 'center',
  },
  pagerText: {
    marginTop: 25,
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonsContainer: {
    width: 250,
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '500',
  }
});

const Question = ({
  item: {
    category,
    question,
  },
  numQuestion,
  numQuestions,
  onAnswer,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {category}
      </Text>
      <View>
        <View style={styles.questionContainer}>
          <HTML html={question} baseFontStyle={{ fontSize: 26, textAlign: 'center', fontWeight: '600' }} />
        </View>
        <Text style={styles.pagerText}>
          {`${numQuestion} of ${numQuestions}`}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => onAnswer(false)}>
          <Text style={styles.buttonText}>
            FALSE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onAnswer(true)}>
          <Text style={styles.buttonText}>
            TRUE
          </Text>
        </TouchableOpacity>
      </View>
    </View>);
};

const mapStateToProps = state => ({
  currentItemIndex: selectCurrentItemIndex(state),
  item: selectCurrentItem(state)
});

const mapDispatchToProps = {
  dispatchSetAnswer: setAnswer,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ items, currentItemIndex }) => ({
    numQuestion: currentItemIndex + 1,
    numQuestions: 10,
  })),
  withHandlers({
    onAnswer: ({ navigator, currentItemIndex, dispatchSetAnswer }) => (isTrue) => {
      dispatchSetAnswer(isTrue);
      if (currentItemIndex === 9) {
        navigator.push({ screen: 'results'});
      }
    }
  })
)(Question);
