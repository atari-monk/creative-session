let sendOnEnter = true;

document
  .querySelector('#toggle-enter-behavior')
  .addEventListener('click', (ev) => {
    sendOnEnter = !sendOnEnter; // toggle the behavior
    ev.target.textContent = sendOnEnter ? 'Send on Enter' : 'New line on Enter'; // update the button text
  });

document.querySelector('.chat').style.display = 'none';

const url = window.location.href;
if (!url.includes('#1')) {
  document.querySelector('#peer-id').placeholder = 'Offer Connection Data';
  document.querySelector('#instruction').innerHTML =
    '<ol>If you want to initiate chat add #1 to url and refresh.<br> To join initiator :<br><li>Paste Offer Connection Data from your peer.<br></li><li>Click Connect.<br></li><li>Copy Answear Connection Data.<br></li><li>Send it to your peer.<br></li><li>Wait for connection.</li><ol>';
  document.querySelector('#initiator-id').textContent =
    'Answear Connection Data';
  document.querySelector('#copy-btn').textContent = 'Copy Answear';
}

const p = new window.SimplePeer({
  initiator: location.hash === '#1',
  trickle: false,
});

p.on('error', (err) => {
  window.document.body.textContent = err.message;
});

p.on('signal', (data) => {
  document.querySelector('#initiator-id').textContent = JSON.stringify(
    data,
    null,
    2
  );
});

document.querySelector('#connect-btn').addEventListener('click', (ev) => {
  p.signal(JSON.parse(document.querySelector('#peer-id').value));
  document.querySelector('#peer-id').value = '';
});

p.on('connect', () => {
  document.querySelector('.connect').style.display = 'none';
  document.querySelector('.chat').style.display = 'flex';

  document.querySelector('#send-btn').addEventListener('click', (ev) => {
    const msg = document.querySelector('#outgoing-msg').value;
    p.send(msg);
    document.querySelector('#outgoing-msg').value = '';

    const pre = document.createElement('pre');
    pre.textContent = `You: ${msg}`;
    document.querySelector('#chat-text').appendChild(pre);
  });

  document.querySelector('#outgoing-msg').addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' && sendOnEnter) {
      ev.preventDefault();
      const msg = document.querySelector('#outgoing-msg').value;
      document.querySelector('#outgoing-msg').value = '';
      const pre = document.createElement('pre');
      pre.textContent = `You: ${msg}`;
      pre.classList.add('your-msg');
      document.querySelector('#chat-text').appendChild(pre);
      p.send(msg);
    }
  });
});

p.on('data', (data) => {
  const pre = document.createElement('pre');
  pre.textContent = `Peer: ${data}`;
  pre.classList.add('peer-msg');
  document.querySelector('#chat-text').appendChild(pre);
});

document.querySelector('#copy-btn').addEventListener('click', (ev) => {
  const offerEl = document.querySelector('#initiator-id');
  const connectData = offerEl.textContent;
  navigator.clipboard.writeText(connectData).then(() => {
    offerEl.classList.add('initiator-id-copied');
    offerEl.textContent = 'Copied';
  });
});
