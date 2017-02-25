import { Component } from 'react';
import { reducer, initStore, startClock } from '../store';
import withRedux  from 'next-redux-wrapper';
import * as Actions from '../actions';

class FollowBox extends Component {
  render () {
    return (
      <div>
        <style jsx>{`
          body {
              font-family: sans-serif;
              padding: 10px;
          }
          h2 {
              font-weight: bold;
              display: inline-block;
          }
          .refresh {
              font-size: 80%;
              margin-left: 10px;
          }
          .header {
              background: #ECECEC;
              padding: 5px;
          }
          .suggestions {
              border: 2px solid #ECECEC;
          }
          li {
              padding: 5px;
          }
          li img {
              width: 40px;
              height: 40px;
              border-radius: 20px;
          }
          li .username, li .close {
              display: inline-block;
              position: relative;
              bottom: 15px;
              left: 5px;
           }
        `}</style>
        <title>Followbox sample by redux-saga</title>
        <div className="container">
          <div className="header">
            <h2>Who to follow</h2><a href="#" className="refresh" onClick={()=>this.props.dispatch(Actions.refresh())}>Refresh</a>
          </div>
          <ul className="suggestions">
            <li className="suggestion1">
              <img />
              <a href="#" target="_blank" className="username">this will not be displayed</a>
              <a href="#" className="close close1" onClick={()=>this.props.dispatch(Actions.close(0))}>x</a>
            </li>
            <li className="suggestion2">
              <img />
              <a href="#" target="_blank" className="username">neither this</a>
              <a href="#" className="close close2" onClick={()=>this.props.dispatch(Actions.close(1))}>x</a>
            </li>
            <li className="suggestion3">
              <img />
              <a href="#" target="_blank" className="username">nor this</a>
              <a href="#" className="close close3" onClick={()=>this.props.dispatch(Actions.close(2))}>x</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withRedux(initStore)(FollowBox);
