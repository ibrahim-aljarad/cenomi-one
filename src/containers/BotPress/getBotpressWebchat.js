const getBotpressWebchat = (testingConfig) => {
  const baseUrl = `https://mediafiles.botpress.cloud/${testingConfig.botId}/webchat/bot.html`;
  const html = `<html>
  <head>
  <meta name="viewport" content="width=device-width, initial-scale=1 viewport-fit=cover, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <style>
      body {
        margin: 0 auto;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        height: 100vh;
      }
      #bp-web-widget-container {
        height: 100%;
        width: 100%;
        margin: auto;
        flex-grow: 1;
      }
      #bp-web-widget-container div {
        height: 100%;
      }
      .webchatIframe {
        position: relative !important;
      }
    </style>
    <title>Chatbot</title>

    <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>


  </head>
  <body>
  
  <div style="height:100%; display:flex; justify-content:center; align-items:center">
  Loading...
  </div>

  <script>

  window.botpressWebChat.init(${JSON.stringify(testingConfig)});

  window.botpressWebChat.onEvent(function () { window.botpressWebChat.sendEvent({ type: 'show' }) }, ['LIFECYCLE.READY']);
  
  </script>
  
  </body>
  </html>`;
  return {
    baseUrl,
    html
  };
};

module.exports = getBotpressWebchat;
