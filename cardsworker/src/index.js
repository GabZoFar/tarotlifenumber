addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const cardNumber = url.pathname.split('/')[2];

  const imageData = await TAROT_CARDS.get(cardNumber, 'arrayBuffer');

  if (!imageData) {
    return new Response('Card not found', { status: 404 });
  }

  return new Response(imageData, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
