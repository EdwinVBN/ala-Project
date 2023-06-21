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

  existingTitel.forEach((cardTitle) => {
    if (cardTitle.innerHTML === deviceData.friendly_name) {
      alreadyExists = true;
    }
  });

  existingButtons.forEach((button) => {
    if (button.innerHTML === deviceData.friendly_name) {
      alreadyExists = true;
    }
  });

  if (!alreadyExists) {
    const template = document.getElementById('template');
    const cardArticle = document.importNode(template.content, true);
    const cardTitle = cardArticle.querySelector('.card-title');
    const buttons = cardArticle.querySelectorAll('.card .buttons');

    cardTitle.innerHTML = deviceData.friendly_name;

    buttons.forEach((button) => {
      button.value = deviceData.friendly_name;
      button.name = deviceData.friendly_name;
      button.onclick = (e) => {
        const state = 'toggle';
        const topic = button.value;
        console.log('hiero');

        const payload = {
          'topic': topic,
          'feature': { 'state': state }
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

    container.appendChild(cardArticle);

    if (deviceData.friendly_name === 'woonkamer/schemerlamp') {
      const div = document.querySelector('[name="woonkamer/schemerlamp"]').parentElement;
      const button = document.createElement('input');
      const br = document.createElement('br');

      button.classList.add('color-button-schemerlamp');
      button.setAttribute('type', 'color');

      div.appendChild(br);
      div.appendChild(button);

      button.onchange = (e) => {
        let color = button.value;
        payload = {
          'topic': deviceData.friendly_name,
          'feature': { 'color': { 'hex': color } }
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
    }

    if (deviceData.friendly_name === 'keuken/licht') {
      const div = document.querySelector('[name="keuken/licht"]').parentElement;
      const button = document.createElement('input');
      const br = document.createElement('br');

      button.classList.add('color-button-keukenLicht');
      button.setAttribute('type', 'color');

      div.appendChild(br);
      div.appendChild(button);

      button.onchange = (e) => {
        let color = button.value;
        payload = {
          'topic': deviceData.friendly_name,
          'feature': { 'color': { 'hex': color } }
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
    } else {
      console.log('msgTopic = ' + msgTopic);
    }
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
