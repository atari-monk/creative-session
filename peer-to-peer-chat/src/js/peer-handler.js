export class PeerHandler {
  setPeerChatUI(peerChatUI) {
    this.peerChatUI = peerChatUI;
  }

  constructor() {
    this.peer = new window.SimplePeer({
      initiator: location.hash === '#1',
      trickle: false,
    });

    // peer object event listeners
    this.peer.on('error', this.handlePeerError.bind(this));
    this.peer.on('signal', this.handlePeerSignal.bind(this));
    this.peer.on('connect', this.handlePeerConnect.bind(this));
    this.peer.on('data', this.handlePeerData.bind(this));
  }

  signal(data) {
    this.peer.signal(data);
  }

  send(msg) {
    this.peer.send(msg);
  }

  // peer object event handlers
  handlePeerError(err) {
    console.log('Error: ', err);
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
