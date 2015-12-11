// Chat component - represents a chat text line
Chat = React.createClass({
  propTypes: {
    chat: React.PropTypes.object.isRequired
  },

  render() {

    return (
      <li className={chatClassName}>

        <span className="text">
          <strong>{this.props.chat.username}</strong>: {this.props.chat.text}
        </span>
      </li>
    );
  }
});
