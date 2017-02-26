import { Component } from 'react';
import { reducer, initStore, startClock } from '../store';
import withRedux  from 'next-redux-wrapper';
import * as Actions from '../actions';
import Head from 'next/head';
import FollowBox from '../components/FollowBox';
import FollowUser from '../components/FollowUser';

class Index extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.refresh());
  }
  render () {
    const { followers, dispatch } = this.props;
    return (
      <div>
        <Head>
          <link rel="stylesheet" type="text/css" href="https://fiddle.jshell.net/css/normalize.css" />
          <title>Followbox sample by redux-saga</title>
        </Head>
        <style jsx global>{`
          body {
              font-family: sans-serif;
              padding: 10px;
          }
        `}
        </style>
        <FollowBox onClick={() => dispatch(Actions.refresh())}>
          <FollowUser imgSrc={followers[0].avatar_url} name={followers[0].login} onClick={() => dispatch(Actions.close(0))}/>
          <FollowUser imgSrc={followers[1].avatar_url} name={followers[1].login} onClick={() => dispatch(Actions.close(1))}/>
          <FollowUser imgSrc={followers[2].avatar_url} name={followers[2].login} onClick={() => dispatch(Actions.close(2))}/>
        </FollowBox>
      </div>
    );
  }
}

export default withRedux(initStore, state => state)(Index);
