addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    // Parse the URL from the request to get the card number
    const url = new URL(request.url);
    const cardNumber = url.pathname.split('/')[2]; // Assuming URL pattern is https://yourdomain.com/cards/1
  
    // Convert card number to a key used in your KV store
    const key = cardNumber.toString();
  
    // Get the tarot card image from the KV store using the key
    const imageData = await TAROT_CARDS.get(key, "arrayBuffer");
  
    // If the image is not found, return a 404 response
    if (!imageData) {
      return new Response('Card not found', { status: 404 })
    }
  
    // Return the image data with appropriate content type
    return new Response(imageData, {
      headers: {
        'Content-Type': 'image/png'
      }
    })
  }
  