export class PeerChatUI {
  constructor() {
    this.sendOnEnter = true;
    // UI elements
    this.toggleEnterBehaviorButton = document.querySelector(
      '#toggle-enter-behavior'
    );
    this.chatContainer = document.querySelector('.chat');
    this.connectContainer = document.querySelector('.connect');
    this.chatContainer.style.display = 'none';
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
    this.sendOnEnter = !this.sendOnEnter; // toggle the behavior
    ev.target.textContent = this.sendOnEnter
      ? 'Send on Enter'
      : 'New line on Enter'; // update the button text
  };

  handleConnectButtonClick = (ev) => {
    // get peer ID from input field
    // signal peer
    // clear input field
    this.peer.signal(JSON.parse(this.peerIdInput.value));
    this.peerIdInput.value = '';
  };

  handleSendButtonClick = (ev) => {
    // get message from input field
    // send message through peer object
    // clear input field
    // display message in chat text container
    const msg = this.outgoingMsgInput.value;
    this.peer.send(msg);
    this.outgoingMsgInput.value = '';

    const pre = document.createElement('pre');
    pre.textContent = `You: ${msg}`;
    this.chatTextContainer.appendChild(pre);
  };

  handleOutgoingMsgInputKeyDown = (ev) => {
    // if Enter key is pressed and sendOnEnter behavior is enabled
    // get message from input field
    // send message through peer object
    // clear input field
    // display message in chat text container
    if (ev.key === 'Enter' && this.sendOnEnter) {
      ev.preventDefault();
      const msg = this.outgoingMsgInput.value;
      this.outgoingMsgInput.value = '';

      const pre = document.createElement('pre');
      pre.textContent = `You: ${msg}`;
      pre.classList.add('your-msg');

      this.chatTextContainer.appendChild(pre);
      this.peer.send(msg);
    }
  };

  handleCopyButtonClick = (ev) => {
    // copy offer connection data to clipboard
    // update UI to indicate that data has been copied
    const offerEl = this.initiatorIdText;
    const connectData = offerEl.textContent;
    navigator.clipboard.writeText(connectData).then(() => {
      offerEl.classList.add('initiator-id-copied');
      offerEl.textContent = 'Copied';
    });
  };

  // peer object event listeners
  handlePeerError = (err) => {
    // display error message in UI
    window.document.body.textContent = err.message;
  };

  handlePeerSignal = (data) => {
    // display connection data in UI
    this.initiatorIdText.textContent = JSON.stringify(data, null, 2);
  };

  handlePeerConnect = () => {
    // hide connection UI
    // display chat UI
    this.connectContainer.style.display = 'none';
    this.chatContainer.style.display = 'flex';
  };

  handlePeerData = (data) => {
    // display received message in chat text container
    const pre = document.createElement('pre');
    pre.textContent = `Peer: ${data}`;
    pre.classList.add('peer-msg');
    this.chatTextContainer.appendChild(pre);
  };
}
