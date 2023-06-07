function fetchAndDisplay () {
    fetch ('192.168.0.100')
    .then(OnRequestSucces,OnRequestFailure)
    .then(onJsonSucces)
    .then(data => {updateData(data);
    })
    .catch(onFailure)
}

function OnRequestSucces(response) {
    if(!response.ok) {
        throw new Error(`Response error: $response.status`);
    } 

    return response.json();
}   

function OnRequestFailure(error) {
    throw new Error (`Request error: $error.message`);
}

function onJsonSucces(data) {
    products = data;
    alert(products[0].name);
}

function onFailure(error) {
    console.error(error.message);
}

var data = {
    "topic": "woonkamer/klimaat",
    "payload": {
      "battery": 100,
      "humidity": 50.29,
      "linkquality": 255,
      "power_outage_count": 8706,
      "pressure": 1016.6,
      "temperature": 22.85,
      "voltage": 3005
    }
  };
  
  function updateData(data) {
    document.getElementById("topicElement").textContent = data.topic;
    document.getElementById("batteryElement").textContent = data.payload.battery;
    document.getElementById("humidityElement").textContent = data.payload.humidity;
    document.getElementById("linkQualityElement").textContent = data.payload.linkquality;
    document.getElementById("powerOutageCountElement").textContent = data.payload.power_outage_count;
    document.getElementById("pressureElement").textContent = data.payload.pressure;
    document.getElementById("temperatureElement").textContent = data.payload.temperature;
    document.getElementById("voltageElement").textContent = data.payload.voltage
    };

fetchAndDisplay();
