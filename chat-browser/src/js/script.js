const p = new window.SimplePeer({
  initiator: location.hash === '#1',
  trickle: false,
});

p.on('error', (err) => console.log('error', err));

p.on('signal', (data) => {
  console.log('SIGNAL', JSON.stringify(data, null, 2));
  document.querySelector('#connecting-div pre').textContent = JSON.stringify(
    data,
    null,
    2
  );
});

document.querySelector('#connect-btn').addEventListener('click', (ev) => {
  p.signal(JSON.parse(document.querySelector('#connect-msg').value));
  document.querySelector('#connect-msg').value = '';
});

p.on('connect', () => {
  console.log('CONNECT');
  p.send('Connected');

  document.querySelector('.connect').style.display = 'none';

  // send message
  document.querySelector('#send-btn').addEventListener('click', (ev) => {
    const msg = document.querySelector('#outgoing-msg').value;
    p.send(msg);
    document.querySelector('#outgoing-msg').value = '';
  });
});

p.on('data', (data) => {
  console.log('data: ' + data);
  // display incoming message
  const pre = document.createElement('pre');
  console.log(typeof data);
  pre.textContent = data;
  document.querySelector('#chatting-div').appendChild(pre);
});

// Add event listener to copy button
document.querySelector('#copy-btn').addEventListener('click', (ev) => {
  const connectData = document.querySelector('#connecting-div pre').textContent;
  navigator.clipboard.writeText(connectData).then(() => {
    console.log('Copied to clipboard');
    // Remove pre element
    document.querySelector('#connecting-div pre').remove();
  });
});
