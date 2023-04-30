export class PeerChatUI {
  constructor(peerHandler) {
    this.peerHandler = peerHandler;
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
    this.peerHandler.signal(JSON.parse(this.peerIdInput.value));
    this.peerIdInput.value = '';
  };

  handleSendButtonClick = (ev) => {
    // get message from input field
    // send message through peer object
    // clear input field
    // display message in chat text container
    const msg = this.outgoingMsgInput.value;
    this.peerHandler.send(msg);
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
      this.peerHandler.send(msg);
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
}
