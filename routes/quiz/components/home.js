import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';

const styles = StyleSheet.create({
  container: {
  }
});

const Home = ({
}) => {
  return (
    <View style={styles.container}>
    </View>);
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
