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

  const container = document.getElementById('container');
  const existingTitel = container.querySelectorAll('.card-title');
  const existingButtons = container.querySelectorAll('.buttons');
  let alreadyExists = false;

  existingTitel.forEach((container) => {
    if (container.innerHTML === deviceData.friendly_name) {
      alreadyExists = true;
    }
  });

  existingButtons.forEach((container) => {
    if (container.innerHTML === deviceData.friendly_name) {
      alreadyExists = true;
    }
  });


  if (!alreadyExists) {
    const template = document.getElementById('template');
    const cardArticle = document.importNode(template.content, true);
    cardArticle.querySelector('.card-title').innerHTML = deviceData.friendly_name;
    cardArticle.querySelectorAll('.card .buttons').forEach((button) => {
      button.value = deviceData.friendly_name;
      button.name = deviceData.friendly_name;
    });
    container.appendChild(cardArticle);
    console.log(document.querySelector('.card-body'))
    if(deviceData.friendly_name == "woonkamer/schemerlamp"){
      console.log()
      const div = document.querySelector('[name="woonkamer/schemerlamp"]').parentElement;
      const button = document.createElement('input');
      button.classList.add('color-button-schemerlamp')
      button.setAttribute('type', 'color')
      console.log(button.value)

      div.appendChild(button);
    }
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

      const button = document.querySelectorAll('.card .btn.btn-primary.buttons');
      console.log(button);

      button.forEach((button) => {
        button.onclick = (e) => {
          const state = 'toggle';
          const topic = button.value;
          console.log('hiero');
  
      const payload = {
        'topic': topic,
        'feature': {'state': state }
      };
  
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      };
  
      fetch('http://192.168.0.100:8000/api/set', options);
    };
  });
  
    } else {
      console.log('msgTopic = ' + msgTopic);
    }
    console.log(document.querySelector('.color-button-schemerlamp').value)

    // let textarea = document.querySelector('#message-history');
    // textarea.value += msgTopic + ': ' + JSON.stringify(msgPayload) + '\n';
    // textarea.scrollTop = 99999;
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


