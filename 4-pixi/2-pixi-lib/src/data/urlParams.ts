let playerUrlParam: string | null = '';
try {
  const urlParams = new URLSearchParams(window.location.search);
  playerUrlParam = urlParams.get('player');
  if (playerUrlParam !== '1' && playerUrlParam !== '2') {
    throw new Error(
      'Invalid player URL parameter. Please specify either "1" or "2".'
    );
  }
} catch (error) {
  console.error(
    'Error: Invalid player URL parameter. Defaulting to empty string.'
  );
  playerUrlParam = '';
}
