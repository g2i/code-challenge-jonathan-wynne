import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { compose, withHandlers, withProps } from 'recompose';
import HTML from 'react-native-render-html';

import { selectQuizItems } from '../duck';

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
  icon: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -5,
  },
  list: {
    marginVertical: 50,
  },
  listItem: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  buttonText: {
    fontSize: 28,
    fontWeight: '500',
    textAlign: 'center',
  }
});

const ResultItem = ({
  text,
  isCorrect,
}) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.icon}>
        {isCorrect ? '+' : '-'}
      </Text>
      <HTML
        html={text}
        baseFontStyle={{ fontSize: 22, fontWeight: '400' }}
        containerStyle={{ paddingHorizontal: 10 }}
      />
    </View>);
}

const keyExtractor = ({ question }) => question;

const Results = ({
  items,
  numCorrectAnswers,
  numQuestions,
  onPlayAgain,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {`You scored\n${numCorrectAnswers} / ${numQuestions}`}
      </Text>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={Object.values(items)}
        renderItem={({item}) => <ResultItem text={item.question} isCorrect={item.answer === item.correct_answer} />}
      />
      <TouchableOpacity onPress={onPlayAgain}>
        <Text style={styles.buttonText}>
          PLAY AGAIN?
        </Text>
      </TouchableOpacity>
    </View>);
};

const mapStateToProps = state => ({
  items: selectQuizItems(state),
});

const mapDispatchToProps = {
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withProps(({ items }) => ({
    numCorrectAnswers: Object.values(items).reduce((acc, cur) => {
      return cur.answer === cur.correct_answer ? acc + 1 : acc
    }, 0),
    numQuestions: 10,
  })),
  withHandlers({
    onPlayAgain: ({ navigator }) => () => navigator.resetTo({
      screen: 'home',
      animationType: 'fade'
    })
  })
)(Results);
