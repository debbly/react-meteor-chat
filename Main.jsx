// App component - represents the whole app
Main = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      hideCompleted: false
    }
  },

  // Loads items from the Chats collection and puts them on this.data.chat
  getMeteorData() {
    let query = {};

    return {
      chat: Chats.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Chats.find({checked: {$ne: true}}).count(),
      currentUser: Meteor.user()
    };
  },

  renderChats() {
    // Get chat from this.data.chat
    return this.data.chat.map((text) => {
      const currentUserId = this.data.currentUser && this.data.currentUser._id;

      return <Chat
        key={text._id}
        task={text} />;
    });
  },

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call("addChat", text);

    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Chat! ({this.data.incompleteCount})</h1>

          <AccountsUIWrapper />
          <ul>
            {this.renderChats()}
          </ul>

          { this.data.currentUser ?
            <form className="new-chat" onSubmit={this.handleSubmit} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to chat, press enter to submit" />
            </form> : ''
          }
        </header>

      </div>
    );
  }
});
