export default (props) =>
  <div>
    <style jsx>{`
      h2 {
        font-weight: bold;
        display: inline-block;
      }
      .refresh {
          font-size: 80%;
          margin-left: 10px;
      }
      .header {
          background: #ECECCC;
          padding: 5px;
      }
      .suggestions {
          border: 2px solid #ECECEC;
      }
    `}
    </style>
    <div className="container">
      <div className="header">
        <h2>Who to follow</h2><a href="#" className="refresh" onClick={props.onClick}>Refresh</a>
      </div>
      <ul className="suggestions">
        {props.children}
      </ul>
    </div>
  </div>;
