import { Component } from 'react';
import { reducer, initStore, startClock } from '../store';
import withRedux from 'next-redux-wrapper';
import * as Actions from '../actions';
import Head from 'next/head';
import FollowBox from '../components/FollowBox';
import FollowUser from '../components/FollowUser';
import Modal from '../components/Modal';

class Index extends Component {
  handleKeyDown(event) {
    if (this.props.showModal && event.keyCode === 27) {
      this.props.dispatch(Actions.uiModalCancel());
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.props.dispatch(Actions.refresh({ verify: false }));
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    const { followers, modal, dispatch } = this.props;
    return (
      <div>
        {modal.show &&
          <Modal
            onOk={() => dispatch(Actions.uiModalOk())}
            onCancel={() => dispatch(Actions.uiModalCancel())}
            title={modal.title}>
            {modal.content}
          </Modal>}
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/css/normalize.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/css/global.css"
          />
          <title>Followbox sample by redux-saga</title>
        </Head>
        <FollowBox
          onClick={() => dispatch(Actions.refresh({ verify: true }))}
          loading={this.props.loading}>
          {followers &&
            [0, 1, 2].map(i => (
              <FollowUser
                key={i}
                imgSrc={followers[i].avatar_url}
                name={followers[i].login}
                onClick={() =>
                  dispatch(Actions.remove({ idx: i, verify: true }))}
              />
            ))}
        </FollowBox>
      </div>
    );
  }
}

export default withRedux(initStore, state => state)(Index);
