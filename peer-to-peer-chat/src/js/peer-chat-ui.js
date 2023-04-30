export class PeerChatUI {
  constructor() {
    // UI elements
    this.toggleEnterBehaviorButton = document.querySelector(
      '#toggle-enter-behavior'
    );
    this.chatContainer = document.querySelector('.chat');
    this.peerIdInput = document.querySelector('#peer-id');
    this.instructionText = document.querySelector('#instruction');
    this.initiatorIdText = document.querySelector('#initiator-id');
    this.copyButton = document.querySelector('#copy-btn');
    this.connectButton = document.querySelector('#connect-btn');
    this.outgoingMsgInput = document.querySelector('#outgoing-msg');
    this.sendButton = document.querySelector('#send-btn');
    this.chatTextContainer = document.querySelector('#chat-text');

    // event handlers
    this.toggleEnterBehaviorButton.addEventListener(
      'click',
      this.handleToggleEnterBehaviorButtonClick
    );
    this.connectButton.addEventListener('click', this.handleConnectButtonClick);
    this.sendButton.addEventListener('click', this.handleSendButtonClick);
    this.outgoingMsgInput.addEventListener(
      'keydown',
      this.handleOutgoingMsgInputKeyDown
    );
    this.copyButton.addEventListener('click', this.handleCopyButtonClick);

    // peer object
    this.peer = new window.SimplePeer({
      initiator: location.hash === '#1',
      trickle: false,
    });

    // peer object event listeners
    this.peer.on('error', this.handlePeerError);
    this.peer.on('signal', this.handlePeerSignal);
    this.peer.on('connect', this.handlePeerConnect);
    this.peer.on('data', this.handlePeerData);
  }

  // UI event handlers
  handleToggleEnterBehaviorButtonClick = (ev) => {
    // toggle sendOnEnter behavior
    // update button text
  };

  handleConnectButtonClick = (ev) => {
    // get peer ID from input field
    // signal peer
    // clear input field
  };

  handleSendButtonClick = (ev) => {
    // get message from input field
    // send message through peer object
    // clear input field
    // display message in chat text container
  };

  handleOutgoingMsgInputKeyDown = (ev) => {
    // if Enter key is pressed and sendOnEnter behavior is enabled
    // get message from input field
    // send message through peer object
    // clear input field
    // display message in chat text container
  };

  handleCopyButtonClick = (ev) => {
    // copy offer connection data to clipboard
    // update UI to indicate that data has been copied
  };

  // peer object event listeners
  handlePeerError = (err) => {
    // display error message in UI
  };

  handlePeerSignal = (data) => {
    // display connection data in UI
  };

  handlePeerConnect = () => {
    // hide connection UI
    // display chat UI
  };

  handlePeerData = (data) => {
    // display received message in chat text container
  };
}
