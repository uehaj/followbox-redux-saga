export default (props) =>
  <div>
    <style jsx>{`
            li {
                padding: 5px;
            }
            li img {
                width: 40px;
                height: 40px;
                border-radius: 20px;
            }
            li .username, li .close {
                padding: 5px;
                display: inline-block;
                position: relative;
                bottom: 15px;
                left: 5px;
             }
          `}
    </style>
    <li className="suggestion">
      <img src={props.imgSrc} />
      <a href="#" target="_blank" className="username">{props.name}</a>
      <a href="#" className="close close1" onClick={props.onClick}>x</a>
    </li>
  </div>;
