const ngrok = require('ngrok');

(async function() {
  const url = await ngrok.connect({
    addr: 3000,
    region: 'us', // or choose a region closer to you
  });
  
  console.log('Public URL:', url);
})(); 