const host = 'http://192.168.0.100:8000/';
let evtSource;
let reconnectFrequency = 1;
let initialShowNameCalled = false;

let tryToSetupStream = function() {
  console.log('trying to connect to SSE stream');
  setupEventSource();
  reconnectFrequency *= 2;
  if (reconnectFrequency >= 64) {
    reconnectFrequency = 64;
  }
};

let reconnectToStream = function() {
  setTimeout(tryToSetupStream, reconnectFrequency * 1000);
};

function showName(deviceData) {
  console.log(deviceData.friendly_name);

  const container = document.getElementById('card');
  const existingCards = container.querySelectorAll('.DevTitel');
  let alreadyExists = false;

  existingCards.forEach((card) => {
    if (card.innerHTML === deviceData.friendly_name) {
      alreadyExists = true;
    }
  });

  if (!alreadyExists) {
    const template = document.getElementById('cardTemp');
    const cardArticle = document.importNode(template.content, true);

    cardArticle.querySelector('.DevTitel').innerHTML = deviceData.friendly_name;
    container.appendChild(cardArticle);
  }
}

function setupEventSource() {
  evtSource = new EventSource(host + 'stream');

  evtSource.onmessage = (e) => {
    const message = JSON.parse(e.data);
    const msgTopic = message.topic;
    const msgPayload = message.payload;
    console.log('@onmessage');

    if (!initialShowNameCalled || msgTopic === 'devices') {
      console.log(msgPayload);
      msgPayload.forEach(showName);
      initialShowNameCalled = true;
    } else {
      console.log('msgTopic = ' + msgTopic);
    }

    let textarea = document.querySelector('#message-history');
    textarea.value += msgTopic + ': ' + JSON.stringify(msgPayload) + '\n';
    textarea.scrollTop = 99999;
  };

  evtSource.onopen = function(e) {
    console.log('connected to stream');
    reconnectFrequency = 1;
  };

  evtSource.onerror = function(e) {
    evtSource.close();
    console.log('an error occurred, the server might be down');
    reconnectToStream();
  };
}

/* let's go! */
tryToSetupStream();
