export class PeerHandler {
  constructor(peer, peerChatUI) {
    this.peer = peer;
    this.peerChatUI = peerChatUI;

    // peer object event listeners
    this.peer.on('error', this.handlePeerError.bind(this));
    this.peer.on('signal', this.handlePeerSignal.bind(this));
    this.peer.on('connect', this.handlePeerConnect.bind(this));
    this.peer.on('data', this.handlePeerData.bind(this));
  }

  // peer object event handlers
  handlePeerError(err) {
    // display error message in UI
    window.document.body.textContent = err.message;
  }

  handlePeerSignal(data) {
    // display connection data in UI
    this.peerChatUI.initiatorIdText.textContent = JSON.stringify(data, null, 2);
  }

  handlePeerConnect() {
    // hide connection UI
    // display chat UI
    this.peerChatUI.connectContainer.style.display = 'none';
    this.peerChatUI.chatContainer.style.display = 'flex';
  }

  handlePeerData(data) {
    // display received message in chat text container
    const pre = document.createElement('pre');
    pre.textContent = `Peer: ${data}`;
    pre.classList.add('peer-msg');
    this.peerChatUI.chatTextContainer.appendChild(pre);
  }
}
