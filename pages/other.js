import React from 'react';
import { reducer, initStore, startClock } from '../store';
import withRedux  from 'next-redux-wrapper';
import * as Actions from '../actions';
import Page from '../components/Page';

class Counter extends React.Component {
  static getInitialProps ({ store, isServer }) {
    store.dispatch(Actions.tick({ light: !isServer, ts: Date.now() }));
    return { isServer };
  }

  componentDidMount () {
    this.props.dispatch(Actions.timerStart());
  }

  componentWillUnmount () {
    this.props.dispatch(Actions.timerStop());
  }

  render () {
    return (
      <Page title='Other Page' linkTo='/' />
    );
  }
}

export default withRedux(initStore)(Counter)
