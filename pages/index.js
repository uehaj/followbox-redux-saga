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
    console.log("props=", this.props);
    return (
      <div>
        <Head>
          <style jsx>{`
          body {
              font-family: sans-serif;
              padding: 10px;
          }
          h2 {
              font-weight: bold;
              display: inline-block;
          }
          `}</style>
          <link rel="stylesheet" type="text/css" href="http://fiddle.jshell.net/css/normalize.css" />
          <title>Followbox sample by redux-saga</title>
        </Head>
        <FollowBox onClick={()=>this.props.dispatch(Actions.refresh())}>
          <FollowUser imgSrc={this.props.followers[0].avatar_url} name={this.props.followers[0].login} onClick={()=>this.props.dispatch(Actions.close(0))}/>
          <FollowUser imgSrc={this.props.followers[1].avatar_url} name={this.props.followers[1].login} onClick={()=>this.props.dispatch(Actions.close(1))}/>
          <FollowUser imgSrc={this.props.followers[2].avatar_url} name={this.props.followers[2].login} onClick={()=>this.props.dispatch(Actions.close(2))}/>
        </FollowBox>
      </div>
    );
  }
}

export default withRedux(initStore, state => state)(Index);
